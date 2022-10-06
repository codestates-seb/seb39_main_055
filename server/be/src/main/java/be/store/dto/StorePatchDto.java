package be.store.dto;

import be.store.entity.Store;
import be.thread.entity.Thread;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@Getter
public class StorePatchDto {

    //스토어 수정
    @Pattern(regexp = "(^숙소$)|(^미용$)|(^카페$)" +
            "|(^맛집$)|(^운동장$)|(^동물병원$)",message = "숙소,미용,카페,맛집,운동장,동물병원중에 선택해주세요.")
    private String category;

    private Double longitude;

    private Double latitude;

    private String storeName;

    private String addressName;

    private String body;

    @Pattern(regexp = "^(010|011|02|031|032|033|041|042|043|044|" +
            "051|052|053|054|055|061|062|063|064|070|050|040)[-\\s]?\\d{3,4}[-\\s]?\\d{4}$",message = "전화번호 형식에 맞춰 입력해주세요.")
    private String phone;

    private List<StoreImageDto> storeImages;

    private String homepage;

    // 스토어 삭제
    private Store.StoreStatus storeStatus;

}
