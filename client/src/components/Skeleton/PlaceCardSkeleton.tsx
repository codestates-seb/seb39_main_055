import styled from "styled-components";

import { Rectangle } from "./Skeleton";
import { Skelcontainer } from "./styles";

const SkeletonBox = styled(Skelcontainer)`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 8px;
`;

const SkeletonFooter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 4px;
`;

const PlaceSkeleton = () => {
  return (
    <SkeletonBox width="100%" height="340px">
      <Rectangle width="100%" height="235px" />
      <Rectangle width="60%" height="20px" />
      <Rectangle width="100%" height="40px" />
      <SkeletonFooter>
        <Rectangle width="20%" height="20px" />
      </SkeletonFooter>
    </SkeletonBox>
  );
};

export default PlaceSkeleton;
