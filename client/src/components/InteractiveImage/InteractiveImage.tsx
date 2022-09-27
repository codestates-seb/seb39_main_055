import { SbButton, SbLabel, SImg, SP } from "./style";

export interface InteractiveProps {
  label: string;
  htmlFor?: string;
  hoverColor: string;
  imageURL: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}
/**
 * 이미지 클릭 시 제거, 대표 이미지 설정 등 각종 클릭 상호작용 추가할 때 사용하는 컴포넌트
 * @param label 이미지 hover 시 나타낼 설명글
 * @param hoverColor 이미지 hover 배경 색상
 * @param imageURL 이미지의 주소(src 속성)
 * @param alt 이미지의 대체 텍스트(alt 속성)
 * @param onClick 이미지 클릭 이벤트 핸들러
 */
const InteractiveImage = ({
  label,
  htmlFor,
  hoverColor,
  imageURL,
  alt,
  className,
  onClick,
}: InteractiveProps) => {
  return (
    <SbLabel htmlFor={htmlFor} className={className}>
      <SP hoverColor={hoverColor}>{label}</SP>
      <SbButton type="button" onClick={onClick}>
        <SImg src={imageURL} alt={alt} />
      </SbButton>
    </SbLabel>
  );
};

export default InteractiveImage;
