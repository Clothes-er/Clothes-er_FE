import { theme } from "@/styles/theme";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import Modal from "../common/Modal";
import { useState } from "react";

const ModifyMenu = () => {
  const router = useRouter();
  const { id } = useParams();

  const [deletePop, setDeletePop] = useState(false);

  const handleDelete = () => {
    setDeletePop(!deletePop);
  };

  const handleCheck = () => {
    /* 게시글 삭제 로직 */
    setDeletePop(!deletePop);
    router.push("/home");
    alert("삭제되었습니다.");
  };

  return (
    <Menu>
      <Option onClick={() => router.push(`/home/${id}/modify`)}>
        수정하기
      </Option>
      <Option className="warning" onClick={handleDelete}>
        삭제하기
      </Option>
      {deletePop && (
        <Modal
          title="정말 삭제하시겠습니까?"
          text="채팅 중인 글의 경우, 삭제를 주의해주세요."
          no="취소"
          yes="삭제"
          onClose={handleDelete}
          onCheck={handleCheck}
        />
      )}
    </Menu>
  );
};

export default ModifyMenu;

const Menu = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 100px;
  height: 70x;
  border-radius: 10px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.158);
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b3_bold};
  overflow: hidden;
`;

const Option = styled.div`
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid ${theme.colors.gray200};
  cursor: pointer;
  &:hover {
    background: ${theme.colors.gray200};
  }

  &.warning {
    color: ${theme.colors.delete};
    border-bottom: none;
    &:hover {
      background: #ffdada;
    }
  }
`;
