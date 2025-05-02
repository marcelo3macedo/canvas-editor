import { FaTshirt, FaImage, FaFont, FaUpload, FaMagic, FaSave } from 'react-icons/fa';
import { ModalType } from '../../types/Sidebar';

const sidebarButtons = [
  {
    icon: <FaTshirt />,
    label: 'Selecionar Produto',
    modal: 'product' as ModalType,
  },
  {
    icon: <FaImage />,
    label: 'Inserir Imagem',
    modal: 'image' as ModalType,
  },
  {
    icon: <FaFont />,
    label: 'Inserir Texto',
    modal: 'text' as ModalType,
  },
  {
    icon: <FaUpload />,
    label: 'Fazer Upload',
    modal: 'upload' as ModalType,
  },
  {
    icon: <FaMagic />,
    label: 'Inteligência Artificial',
    modal: 'ai'
  },
  {
    icon: <FaSave />,
    label: 'Salvar Arte',
    modal: 'save' as ModalType,
  },
];

export { sidebarButtons };