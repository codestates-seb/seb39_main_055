package be.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

//@AllArgsConstructor
@Getter
@NoArgsConstructor
public class MultiResponseDto<T> {

//    private List<T> data;
//    private PageInfo pageInfo;
//
//    public MultiResponseDto(List<T> data, Page page){
//        this.data = data;
//        this.pageInfo = new PageInfo(page.getNumber()+1,
//                page.getSize(),page.getTotalElements(),page.getTotalPages());
//    }

    private List<T> data;

    public MultiResponseDto(List<T> data){
        this.data = data;
    }
}
