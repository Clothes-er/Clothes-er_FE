import styled, { keyframes } from "styled-components";

interface SkeletonProps {
  height?: string;
  width?: string;
  size?: string;
  marginBottom?: string;
  borderRadius?: string;
}

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonWrapper = styled.div`
  background: #e0e0e0;
  background-image: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f5f5f5 50%,
    #e0e0e0 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 5px;
`;

export const SkeletonBox = styled(SkeletonWrapper)<SkeletonProps>`
  width: 100%;
  height: ${(props) => props.height || "100px"};
  width: 100%;
  padding: 24px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const SkeletonCircle = styled(SkeletonWrapper)<SkeletonProps>`
  width: ${(props) => props.width || "76px"};
  height: ${(props) => props.height || "76px"};
  border-radius: ${(props) => props.borderRadius || "50%"};
`;

export const SkeletonText = styled(SkeletonWrapper)<SkeletonProps>`
  width: ${(props) => props.width || "100%"};
  height: 20px;
  margin-bottom: 10px;
`;

export const SkeletonPost = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const SkeletonProfile = styled.div`
  width: 100%;
  height: 73px;
  padding: 14px 48px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 29px;
`;

export const SkeletonDiv = styled.div`
  width: 80%;
`;
