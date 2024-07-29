import React, { ReactNode, useEffect, useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface BottomModalProps {
  title: string;
  children: ReactNode;
  buttonText: string;
  onClose: () => void;
  autoClose?: boolean;
  disable?: boolean;
}

const BottomModal: React.FC<BottomModalProps> = (props) => {
  const router = useRouter();
  const {
    title,
    children,
    buttonText,
    onClose,
    autoClose = false,
    disable = false,
  } = props;
  const [isClosing, setIsClosing] = useState(false);

  /* 3초 뒤 자동 닫힘 */
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsClosing(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  /* 서서히 닫히고 홈으로 */
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
        router.push("/");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose, router]);

  return (
    <AnimatePresence>
      <MotionBlur>
        {!isClosing && (
          <MotionModal
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5 }}
          >
            <Padding>
              <Title>{title}</Title>
              {children}
            </Padding>
            <Button
              buttonType="primary"
              size="small"
              text={buttonText}
              onClick={onClose}
              blink={true}
              disabled={disable}
            />
          </MotionModal>
        )}
      </MotionBlur>
    </AnimatePresence>
  );
};

export default BottomModal;

const MotionBlur = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(9, 9, 9, 0.8);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow-y: hidden;
`;

const MotionModal = styled(motion.div)`
  width: 100%;
  height: 406px;
  padding: 40px 34px 30px 34px;
  border-radius: 15px 15px 0px 0px;
  background: ${theme.colors.white};
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
`;

const Padding = styled.div`
  width: 100%;
  padding: 0px 7px;
`;

const Title = styled.div`
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.h2_bold};
  white-space: pre-wrap;
  margin-bottom: 17px;
`;
