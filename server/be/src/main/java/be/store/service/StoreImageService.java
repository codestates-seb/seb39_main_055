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

    public List<StoreImage> findVerifiedStoreImages(Store store){
        List<StoreImage> findStoreImages = storeImageRepository.findAllByStoreAndStoreImageStatus(
                store, StoreImage.StoreImageStatus.STORE_IMAGE_EXIST);
        return findStoreImages;
    }
}
