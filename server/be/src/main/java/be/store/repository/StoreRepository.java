package be.store.repository;

import be.store.entity.Store;
import be.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByLatitudeAndLongitudeAndNameAndStoreStatus(
            Double latitude,Double longitude,String storeName,Store.StoreStatus storeStatus);

    Page<Store> findByCategoryAndStoreStatus(Pageable pageable, String category, Store.StoreStatus storeStatus);

    @Query(value = "SELECT * FROM store s where s.status = :status and s.category = :category" +
            " ORDER BY  (6371*acos(cos(radians(:latitude))*cos(radians(s.latitude))*cos(radians(s.longitude)" +
            "-radians(:longitude))+sin(radians(:latitude))*sin(radians(s.latitude))))",nativeQuery = true)
    List<Store> findByCategoryAndStoreStatusSortByDistance(@Param("longitude")double longitude,
                                                           @Param("latitude") double latitude,
                                                           @Param("category")String category,
                                                           @Param("status")String storeStatus);

    @Query(value = "select * from store s where (s.status= :status and s.category= :category) and " +
            "(upper(s.name) like upper(concat('%',:keyword,'%')) or " +
            "upper(s.address_name) like upper(concat('%',:keyword,'%')) or " +
            "upper(s.body) like upper(concat('%',:keyword,'%')))",nativeQuery = true)
    List<Store> searchStoreByCategoryAndKeyword(@Param("category") String category,@Param("keyword") String keyword,@Param("status")String storeStatus);

    @Query(value = "select * from store s where (s.status= :status) and " +
            "(upper(s.name) like upper(concat('%',:keyword,'%')) or " +
            "upper(s.address_name) like upper(concat('%',:keyword,'%')) or " +
            "upper(s.body) like upper(concat('%',:keyword,'%')))",nativeQuery = true)
    List<Store> searchStoreByKeyword(@Param("keyword") String keyword,@Param("status")String storeStatus);


}
