package be.store.repository;

import be.store.entity.Store;
import be.store.entity.StoreImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreImageRepository extends JpaRepository<StoreImage, Long> {

    List<StoreImage> findAllByStoreAndStoreImageStatus(Store store, StoreImage.StoreImageStatus storeImageStatus);

}
