// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import React, {
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react"
import classnames from "classnames"
import ReactModal, { type Props } from "react-modal"

export interface IComstomModalProps extends Props {
  size?: "small" | "regular" | "large"
  title: string
  footChildren?: React.ReactNode
  mainClassName?: string
  modalContainerClass?: string
}

export const ModalMain: FC<HTMLAttributes<unknown>> = ({
  children,
  className,
}) => <div className={`relative flex-auto p-6 ${className}`}>{children}</div>

export interface IModalFooterType {
  onClose?: () => void
  onSubmit?: () => void
  doneTitle?: string
  loading?: boolean
  hideSubmitBtn?: boolean
  form?: string
  type?: "submit" | "reset" | "button" | undefined
}

export const ModalFooter: FC<PropsWithChildren<IModalFooterType>> = ({
  children,
}) => (
  <div
    className={`flex flex-row-reverse items-center justify-between rounded-b-xl border-t  border-gray-300 bg-white px-4 py-4  sm:px-6  `}
  >
    {children}
  </div>
)

export const ModalFooterDefaultBtn: FC<IModalFooterType> = ({
  onClose,
  onSubmit,
  doneTitle,
  hideSubmitBtn,
  loading = false,
  form,
  type,
}) => (
  <div>
    <button className="btn-outline btn mr-2 " type="button" onClick={onClose}>
      Cancel
    </button>
    {hideSubmitBtn ? (
      ""
    ) : (
      <button
        className={classnames("btn-primary btn", { loading })}
        type={type ?? "submit"}
        onClick={onSubmit}
        form={form}
      >
        {doneTitle ?? "Confirm"}
      </button>
    )}
  </div>
)

export const ModalContainer: FC<
  {
    title: string
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void
  } & HTMLAttributes<HTMLDivElement>
> = ({ title, children, className, onClose }) => (
  <div
    className={`relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none  focus:outline-none ${className}`}
  >
    <div className=" flex items-start justify-between rounded-t border-b border-gray-300  p-5">
      <h3 className="text-3xl font-semibold">{title}</h3>
      {onClose && (
        <button className="" onClick={onClose}>
          x
          {/* <FontAwesomeIcon icon={["fas", "xmark"]} className={"h-5 w-5"} /> */}
        </button>
      )}
    </div>
    {children}
  </div>
)

export const Modal: FC<
  PropsWithChildren<IComstomModalProps & IModalFooterType>
> = ({
  isOpen,
  children,
  size = "large",
  title,
  loading,
  onClose,
  onSubmit,
  mainClassName,
  modalContainerClass,
  form,
  footChildren,
  ...props
}) => (
  <ReactModal
    isOpen={isOpen}
    closeTimeoutMS={150}
    ariaHideApp={false}
    overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center w-full h-full"
    onRequestClose={(e) => {
      if ("key" in e && e.key === "Escape" && onClose) {
        onClose()
      }
    }}
    className={classnames(
      "relative my-6 mx-auto w-auto min-w-[400px] max-w-sm outline-none ",
      { "min-w-sm": size === "small" },
      { "min-w-3xl": size === "regular" },
      { "min-w-6xl": size === "large" },
    )}
    {...props}
  >
    <ModalContainer
      className={classnames(
        ` flex flex-col duration-300 ${modalContainerClass}`,
        {
          "animate-in fade-in slide-in-from-bottom-20": isOpen,
          "animate-out fade-out slide-out-to-bottom-20": !isOpen,
        },
      )}
      title={title}
      onClose={onClose}
    >
      <ModalMain className={mainClassName}>{children}</ModalMain>
      <ModalFooter>
        <ModalFooterDefaultBtn
          onClose={onClose}
          form={form}
          loading={loading}
          onSubmit={onSubmit}
          {...props}
        />
        {footChildren}
      </ModalFooter>
    </ModalContainer>
  </ReactModal>
)
