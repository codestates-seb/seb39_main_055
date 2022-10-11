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

    public void verifyExistStoreThenCheckOwner(Store store1){//이미 등록된 가게인지 확인하고 이미 등록한 가게가 있다면,
                                                                                    // 해당 등록한 가게의 주인이 아니면 예외 발생,
        Optional<Store> store = storeRepository.findByLatitudeAndLongitudeAndNameAndStoreStatus(
                store1.getLatitude(),store1.getLongitude(),store1.getName(),Store.StoreStatus.STORE_EXIST
        );
        if(store.isPresent()) { //이미 등록된 가게면
            if(store.get().getUser() != store1.getUser())// 해당 등록한 가게의 주인이 아니면 예외 발생,
                throw new BusinessLogicException(ExceptionCode.STORE_EXISTS);
        }
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

        verifyExistStoreThenCheckOwner(store);//이미 등록된 가게인지 확인

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

        List<Store> stores = storeRepository.findByCategoryAndStoreStatus(
                category,
                Store.StoreStatus.STORE_EXIST); //삭제된 스토어 뺴고 전체 스토어가져옴

        Comparator<Store> comparator;
        if(sort.equals("createdAt")){//최신순 정렬
            comparator = new Comparator<Store>() {
                @Override
                public int compare(Store o1, Store o2) {
                    return o1.getCreatedAt().compareTo(o2.getCreatedAt());
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
                    return Double.compare(distance2,distance1);
                }
            };
        }
        else if(sort.equals("score")){// 평균 별점 순
            comparator = new Comparator<Store>() {
                @Override
                public int compare(Store o1, Store o2) {

                    Double mean1;
                    Double mean2;
                    if(o1.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                            collect(Collectors.toList()).size()==0){ // 해당 score의 리뷰수가 0일때
                        mean1=0.; //해당 store의 평균 리뷰의 스코어는 0
                    }else{// 해당 score의 리뷰수가 0이 아닐때 -> 평균 구해줌
                        Integer reviewScoreSum1 = o1.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).map(review -> review.getScore()).mapToInt(Integer::intValue).sum();
                        mean1 = reviewScoreSum1/(double)(o1.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                                collect(Collectors.toList()).size());
                    }

                    if(o2.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                            collect(Collectors.toList()).size()==0){// 해당 score의 리뷰수가 0일때
                        mean2=0.;//해당 store의 평균 리뷰의 스코어는 0
                    }else{// 해당 score의 리뷰수가 0이 아닐때 -> 평균 구해줌
                        Integer reviewScoreSum2 = o2.getReviews().stream().map(review -> review.getScore()).mapToInt(Integer::intValue).sum();
                        mean2 = reviewScoreSum2/(double)(o2.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                                collect(Collectors.toList()).size());
                    }


                    return Double.compare(mean1,mean2);
                }
            };

        }else if(sort.equals("reviewCount")){//리뷰수 순 정렬
            comparator = new Comparator<Store>() {
                @Override
                public int compare(Store o1, Store o2) {

                    Integer count1 = o1.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                            collect(Collectors.toList()).size();
                    Integer count2 = o2.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                            collect(Collectors.toList()).size();

                    return count1-count2;
                }
            };
        }else{ //sort의 쿼리스트링 파라미터가 올바른 값이 아님
            throw new BusinessLogicException(ExceptionCode.SORT_NOT_FOUND);
        }
        Collections.sort(stores,comparator.reversed());


        PageRequest pageRequest =PageRequest.of(page,size);
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), stores.size());
        Page<Store> pagingStores = new PageImpl<>(stores.subList(start, end), pageRequest, stores.size());

        return pagingStores;

    }

    public void deleteTheOwnerStores(User user){//매개변수로 들어가는 유저가 가지고 있는 Store를 전부 삭제
        List<Store> stores = storeRepository.findByUserAndStoreStatus(user, Store.StoreStatus.STORE_EXIST);// 해당유저의 존재하는 store 불러옴

        stores.stream().forEach(store -> store.setStoreStatus(Store.StoreStatus.STORE_NOT_EXIST)); //store들 전부 삭제


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
        searchStoreResult=searchStoreResult.stream().distinct().collect(Collectors.toList()); // 키워드 검색 결과의 중복 제거



        Comparator<Store> comparator;
        if(sort.equals("createdAt")){//최신순 정렬
            comparator = new Comparator<Store>() {
                @Override
                public int compare(Store o1, Store o2) {
                    return o1.getCreatedAt().compareTo(o2.getCreatedAt());
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
                    return Double.compare(distance2,distance1);
                }
            };
        }else if(sort.equals("score")){//평균 별점 순
            comparator = new Comparator<Store>() {
                @Override
                public int compare(Store o1, Store o2) {

                    Double mean1;
                    Double mean2;
                    if(o1.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                            collect(Collectors.toList()).size()==0){ // 해당 score의 리뷰수가 0일때
                        mean1=0.; //해당 store의 평균 리뷰의 스코어는 0
                    }else{// 해당 score의 리뷰수가 0이 아닐때 -> 평균 구해줌
                        Integer reviewScoreSum1 = o1.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).map(review -> review.getScore()).mapToInt(Integer::intValue).sum();
                        mean1 = reviewScoreSum1/(double)(o1.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                                collect(Collectors.toList()).size());
                    }

                    if(o2.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                            collect(Collectors.toList()).size()==0){// 해당 score의 리뷰수가 0일때
                        mean2=0.;//해당 store의 평균 리뷰의 스코어는 0
                    }else{// 해당 score의 리뷰수가 0이 아닐때 -> 평균 구해줌
                        Integer reviewScoreSum2 = o2.getReviews().stream().map(review -> review.getScore()).mapToInt(Integer::intValue).sum();
                        mean2 = reviewScoreSum2/(double)(o2.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                                collect(Collectors.toList()).size());
                    }


                    return Double.compare(mean1,mean2);
                }
            };

        }else if(sort.equals("reviewCount")){//리뷰수 순 정렬
            comparator = new Comparator<Store>() {
                @Override
                public int compare(Store o1, Store o2) {

                    Integer count1 = o1.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                            collect(Collectors.toList()).size();
                    Integer count2 = o2.getReviews().stream().filter(review -> review.getReviewStatus()== Review.ReviewStatus.REVIEW_EXIST).
                            collect(Collectors.toList()).size();

                    return count1-count2;
                }
            };
        }else{ //sort의 쿼리스트링 파라미터가 올바른 값이 아님
            throw new BusinessLogicException(ExceptionCode.SORT_NOT_FOUND);
        }
        Collections.sort(searchStoreResult,comparator.reversed());


        PageRequest pageRequest =PageRequest.of(page,size);
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchStoreResult.size());

        Page<Store> stores = new PageImpl<>(searchStoreResult.subList(start, end), pageRequest, searchStoreResult.size());

        return stores;

    }


}
