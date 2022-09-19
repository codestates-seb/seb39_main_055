package be.store.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.store.entity.Store;
import be.store.repository.StoreRepository;
import be.user.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

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
