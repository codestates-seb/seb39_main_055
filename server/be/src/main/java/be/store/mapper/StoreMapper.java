package be.store.mapper;

import be.store.dto.StoreResponseDto;
import be.store.entity.Store;
import be.user.dto.UserResponseDto;
import be.user.mapper.UserMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StoreMapper {
    default StoreResponseDto storeToStoreResponse(UserMapper userMapper,Store store){
        StoreResponseDto storeResponseDto = new StoreResponseDto();
        storeResponseDto.setStoreId(store.getStoreId());
        storeResponseDto.setCreatedAt(store.getCreatedAt());
        storeResponseDto.setUpdatedAt(store.getUpdatedAt());
        storeResponseDto.setStoreStatus(store.getStoreStatus());
        storeResponseDto.setCategory(store.getCategory());
        storeResponseDto.setLongitude(store.getLongitude());
        storeResponseDto.setLatitude(store.getLatitude());
        storeResponseDto.setStoreName(store.getName());
        storeResponseDto.setAddressName(store.getAddressName());
        storeResponseDto.setBody(store.getBody());
        storeResponseDto.setPhone(store.getPhone());
        storeResponseDto.setHomepage(store.getHomepage());

        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(store.getUser());
        storeResponseDto.setUser(userResponseDto);

        return storeResponseDto;
    }
}
