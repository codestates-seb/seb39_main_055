package be.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StorePostDto {

    @NotBlank
    @Pattern(regexp = "(^숙소$)|(^미용$)|(^카페$)" +
            "|(^맛집$)|(^운동장$)|(^동물병원$)",message = "숙소,미용,카페,맛집,운동장,동물병원중에 선택해주세요.")
    private String category;

    @NotNull
    private Double longitude;
    @NotNull
    private Double latitude;
    @NotBlank
    private String storeName;
    @NotBlank
    private String addressName;
    @NotBlank
    private String body;

    @NotBlank
    @Pattern(regexp = "^(010|011|02|031|032|033|041|042|043|044|" +
            "051|052|053|054|055|061|062|063|064|070|050|040)[-\\s]?\\d{3,4}[-\\s]?\\d{4}$",message = "전화번호 형식에 맞춰 입력해주세요.")
    private String phone;

    private List<StoreImageDto> storeImages;

    private String homepage;

}
