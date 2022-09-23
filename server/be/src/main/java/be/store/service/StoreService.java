package be.store.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.store.entity.Store;
import be.store.entity.StoreImage;
import be.store.repository.StoreRepository;
import be.user.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    @Transactional
    public Store createStore(Store store){
        //이미 등록된 스토어인지 확인
        verifyExistStore(store.getUser(),store.getLatitude(),store.getLongitude(),store.getName());//이미 등록된 가게인지 확인

        return storeRepository.save(store);
    }

    public void verifyExistStore(User user,Double latitude,Double longitude,String storeName){//이미 등록된 가게인지 확인
        Optional<Store> store = storeRepository.findByUserAndLatitudeAndLongitudeAndNameAndStoreStatus(
                user,latitude,longitude,storeName,Store.StoreStatus.STORE_EXIST
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

}
