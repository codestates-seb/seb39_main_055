package be.store.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.review.entity.Review;
import be.store.entity.Store;
import be.store.entity.StoreImage;
import be.store.repository.StoreRepository;
import be.user.entity.User;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.lang.Math;

import java.util.*;
import java.util.stream.Collectors;

import static java.lang.Math.*;

@Service
@AllArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final UserService userService;

    @Transactional
    public Store createStore(Store store){

        verifyExistStore(store.getLatitude(),store.getLongitude(),store.getName());//이미 등록된 가게인지 확인

        return storeRepository.save(store);
    }

    public void verifyExistStore(Double latitude,Double longitude,String storeName){//이미 등록된 가게인지 확인
        Optional<Store> store = storeRepository.findByLatitudeAndLongitudeAndNameAndStoreStatus(
                latitude,longitude,storeName,Store.StoreStatus.STORE_EXIST
        );
        if(store.isPresent()) //이미 등록된 가게면 에러!
            throw new BusinessLogicException(ExceptionCode.STORE_EXISTS);
    }

    public Store findVerifiedStore(long storeId){
        Optional<Store> optionalStore = storeRepository.findById(storeId);

        Store findStore=optionalStore.orElseThrow(()-> //만일 db에 저장된 스토어 정보 없으면 예외발생
                new BusinessLogicException(ExceptionCode.STORE_NOT_FOUND));

        if(findStore.getStoreStatus() == Store.StoreStatus.STORE_NOT_EXIST){// 만일 삭제된 스토어라면 예외발생
            throw new BusinessLogicException(ExceptionCode.STORE_NOT_FOUND);
        }
        return findStore;
    }

    public User findUserAtStore(long storeId){//해당 스토어의 주인유저 반환
        Store findStore = findVerifiedStore(storeId);//만약 스토어가 DB에 없거나 삭제된 스토어면 예외 발생
        return findStore.getUser();
    }

    @Transactional
    public Store updateStore(Store store){

        verifyExistStore(store.getLatitude(),store.getLongitude(),store.getName());//이미 등록된 가게인지 확인

        Store findStore = findVerifiedStore(store.getStoreId());//만약 스토어가 DB에 없거나 삭제된 스토어면 예외 발생

        Optional.ofNullable(store.getUpdatedAt())//업데이트 날짜 수정
                .ifPresent(storeUpdatedAt -> findStore.setUpdatedAt(storeUpdatedAt));

        Optional.ofNullable(store.getStoreImages())//스토어 이미지 수정
                .ifPresent(storeImages -> { //StoreImages null값 아닐때!
                    findStore.getStoreImages().stream().forEach(storeImage -> //기존 스토어이미지 삭제(STORE_IMAGE_NOT_EXIST)됌
                            storeImage.setStoreImageStatus(StoreImage.StoreImageStatus.STORE_IMAGE_NOT_EXIST));

                    store.getStoreImages().stream().forEach(storeImage -> //새 스토어 이미지로 갱신
                            findStore.getStoreImages().add(storeImage));
                });
        Optional.ofNullable(store.getLatitude())// Latitude 수정
                .ifPresent(latitude -> findStore.setLatitude(latitude));

        Optional.ofNullable(store.getLongitude())// Longitude 수정
                .ifPresent(longitude -> findStore.setLongitude(longitude));

        Optional.ofNullable(store.getCategory())// Longitude 수정
                .ifPresent(category -> findStore.setCategory(category));

        Optional.ofNullable(store.getName())// 스토어 Name 수정
                .ifPresent(name -> findStore.setName(name));

        Optional.ofNullable(store.getAddressName()) //스토어 AddressName 수정
                .ifPresent(addressName -> findStore.setAddressName(addressName));

        Optional.ofNullable(store.getBody()) //body 수정
                .ifPresent(body->findStore.setBody(body));

        Optional.ofNullable(store.getPhone()) //phone 수정
                .ifPresent(phone->findStore.setPhone(phone));

        Optional.ofNullable(store.getHomepage()) //homepage 수정
                .ifPresent(homepage -> findStore.setHomepage(homepage));

        Optional.ofNullable(store.getStoreStatus())//store 삭제
                .ifPresent(storeStatus -> findStore.setStoreStatus(storeStatus));

        return findStore;
    }

    public Page<Store> findStores(int page,int size,String sort,String category,Double latitude,Double longitude){

        if(sort.equals("createdAt")){//최신순 정렬
            Page<Store> stores = storeRepository.findByCategoryAndStoreStatus(
                    PageRequest.of(page,size, Sort.by(sort).descending()),
                    category,
                    Store.StoreStatus.STORE_EXIST); //삭제된 스토어 뺴고 전체 스토어 최신순으로 가져옴

            System.out.println(stores.getTotalElements());
            System.out.println(sort);

            return stores;
        }else if(sort.equals("distance")){ //거리순 정렬
            List<Store> findAllStore = storeRepository.findByCategoryAndStoreStatusSortByDistance(
                    longitude,
                    latitude,
                    category,
                    Store.StoreStatus.STORE_EXIST.toString()); //삭제된 스토어 뺴고 전체 스토어 최신순으로 가져옴

            PageRequest pageRequest =PageRequest.of(page,size);
            int start = (int)pageRequest.getOffset();
            int end = Math.min((start + pageRequest.getPageSize()), findAllStore.size());
            Page<Store> stores = new PageImpl<>(findAllStore.subList(start, end), pageRequest, findAllStore.size());

            return stores;
        }else{ //sort의 쿼리스트링 파라미터가 올바른 값이 아님
            throw new BusinessLogicException(ExceptionCode.SORT_NOT_FOUND);
        }

    }

    public Page<Store> searchStores(Double latitude,Double longitude,String category,String keyword,Integer page,Integer size,String sort){

        String[] keywords = keyword.split(" "); //뛰어쓰기 단위로 키워드 나누기
        List<Store> searchStoreResult = new ArrayList<>();


        if(category.equals("total")){ //전체 카테고리에서 검색
            for(String keywordElt:keywords){
                searchStoreResult.addAll(
                        storeRepository.searchStoreByKeyword(//삭제된 스토어 빼고 해당 카테고리내 전체 검색결과 스토어를 가져옴
                                keywordElt, Store.StoreStatus.STORE_EXIST.name())
                ); // 그리고 가져온 List를 searchStoreResult에 합쳐줌
            }
        }else{//해당 카테고리에서 검색
            for(String keywordElt:keywords){
                searchStoreResult.addAll(
                        storeRepository.searchStoreByCategoryAndKeyword(//삭제된 스토어 빼고 해당 카테고리내 전체 검색결과 스토어를 가져옴
                                category,keywordElt, Store.StoreStatus.STORE_EXIST.name())
                ); // 그리고 가져온 List를 searchStoreResult에 합쳐줌
            }
        }
        searchStoreResult.stream().distinct().collect(Collectors.toList()); // 키워드 검색 결과의 중복 제거



        Comparator<Store> comparator;
        if(sort.equals("createdAt")){//최신순 정렬
            comparator = new Comparator<Store>() {
                @Override
                public int compare(Store o1, Store o2) {
                    return o1.getCreatedAt().isBefore(o2.getCreatedAt())?1:-1;
                }
            };
        }else if(sort.equals("distance")){ //거리순 정렬
            comparator = new Comparator<Store>() {
                @Override
                public int compare(Store o1, Store o2) {
                    double distance1 = 6371*acos(cos(toRadians(latitude))*cos(toRadians(o1.getLatitude()))
                            *cos(toRadians(o1.getLongitude()) -toRadians(longitude))+sin(toRadians(latitude))*sin(toRadians(o1.getLatitude())));

                    double distance2 = 6371*acos(cos(toRadians(latitude))*cos(toRadians(o2.getLatitude()))
                            *cos(toRadians(o2.getLongitude()) -toRadians(longitude))+sin(toRadians(latitude))*sin(toRadians(o2.getLatitude())));
                    return (distance1>distance2)?1:-1;
                }
            };
        }else{ //sort의 쿼리스트링 파라미터가 올바른 값이 아님
            throw new BusinessLogicException(ExceptionCode.SORT_NOT_FOUND);
        }
        Collections.sort(searchStoreResult,comparator);


        PageRequest pageRequest =PageRequest.of(page,size);
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchStoreResult.size());

        Page<Store> stores = new PageImpl<>(searchStoreResult.subList(start, end), pageRequest, searchStoreResult.size());

        return stores;

    }


}
