package be.store.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.store.entity.Store;
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

}
