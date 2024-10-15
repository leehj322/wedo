"use client";

import {
  ReactElement,
  useState,
  useEffect,
  cloneElement,
  ReactNode,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/@common/modal/Dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/@common/modal/Sheet";
import useDeviceType from "@/hooks/useDeviceType";

interface ModalProps {
  type: "modal" | "alert";
  children: ReactNode;
  trigger: boolean | ReactElement;
  title?: string;
  description?: string;
  footer?: ReactNode;
  hasCrossCloseIcon?: boolean;
}

/**
 * 공통 Modal 컴포넌트
 * @param type alert(외부 클릭시 닫히지 않음), modal(외부 클릭시 닫힘)을 선택
 * @param trigger trigger를 boolean state로 전달하는 경우, 해당 state값이 변경될 때 마다 modal이 true일때 open, false일때 close / ReactElement로 전달하는 경우 onClick 이벤트로 open 상태를 toggle함
 * @param title modal의 title, <h2> 태그 사용
 * @param description modal의 description, <p> 태그 사용
 * @param footer modal의 footer, footer에 onClick이벤트로 modal을 close하도록 하기 때문에 내부에 모달이 종료될때 눌러야 하는 버튼을 배치
 * @param hasCrossCloseIcon modal의 우측 상단에 X 모양 닫힘 Icon을 표시할지 안할지 결정
 */
export default function Modal({
  type,
  children,
  trigger,
  title,
  description,
  footer,
  hasCrossCloseIcon,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile] = useDeviceType();

  // open 상태를 toggle하는 함수
  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // alert인 경우 외부와 상호작용 했을 때 닫히지 않도록 하는 함수
  const handleInteractOutside = (e: Event) => {
    if (type === "modal") return;
    e.preventDefault();
  };

  // trigger 값이 boolean 상태로 관리되는 경우에 useEffect를 통해 isOpen값을 변경
  useEffect(() => {
    if (typeof trigger !== "boolean") return;
    setIsOpen(trigger);
  }, [trigger]);

  return (
    <>
      {typeof trigger !== "boolean" &&
        cloneElement(trigger, {
          onClick: toggleIsOpen,
        })}
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={toggleIsOpen}>
          <SheetContent
            hasCrossCloseIcon={type === "alert" ? false : hasCrossCloseIcon}
            onInteractOutside={handleInteractOutside}
          >
            <SheetHeader>
              {title && <SheetTitle>{title}</SheetTitle>}
              {description && (
                <SheetDescription>{description}</SheetDescription>
              )}
            </SheetHeader>
            {children}
            <SheetFooter onClick={toggleIsOpen}>{footer}</SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
          <DialogContent
            hasCrossCloseIcon={type === "alert" ? false : hasCrossCloseIcon}
            onInteractOutside={handleInteractOutside}
          >
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
            {children}
            <DialogFooter onClick={toggleIsOpen}>{footer}</DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
