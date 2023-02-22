import {createContext, ReactNode, useContext} from 'react';

interface PostDetailModalContextProps {
  children: ReactNode;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}

interface PostDetailModalContextType {
  isPostDetailModalVisible: boolean;
  closePostDetailModal: () => void;
}

const PostDetailModalContext = createContext<PostDetailModalContextType>({
  isPostDetailModalVisible: false,
  closePostDetailModal: () => {},
});

export const PostDetailModalProvider = ({
  children,
  isModalVisible,
  setIsModalVisible,
}: PostDetailModalContextProps) => {
  const closePostDetailModal = () => {
    setIsModalVisible(false);
  };

  return (
    <PostDetailModalContext.Provider
      value={{
        closePostDetailModal,
        isPostDetailModalVisible: isModalVisible,
      }}>
      {children}
    </PostDetailModalContext.Provider>
  );
};

export const usePostDetailModal = () => {
  return useContext(PostDetailModalContext);
};
