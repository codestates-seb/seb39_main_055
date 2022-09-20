package be.store.repository;

import be.store.entity.Store;
import be.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByUserAndLatitudeAndLongitudeAndNameAndStoreStatus(
            User user,Double latitude,Double longitude,String storeName,Store.StoreStatus storeStatus);
}
