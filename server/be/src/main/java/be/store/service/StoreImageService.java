package be.store.service;

import be.store.entity.Store;
import be.store.entity.StoreImage;
import be.store.repository.StoreImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StoreImageService {

    StoreImageRepository storeImageRepository;

    public List<StoreImage> findVerifiedStoreImages(Store store){ //해당 스토어의 스토어이미지들 중에서 status가 STORE_IMAGE_EXIST것만 반환
        List<StoreImage> findStoreImages = storeImageRepository.findAllByStoreAndStoreImageStatus(
                store, StoreImage.StoreImageStatus.STORE_IMAGE_EXIST);
        return findStoreImages;
    }
}
