import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import {
  // InfoCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';

interface optionsConfirm {
  title: string;
  message: string;
  onOk: () => any;
  onCancel: () => any;
}

export function conrfirmMessageModal(options: optionsConfirm) {
  Modal.confirm({
    title: options.title,
    icon: createVNode(QuestionCircleOutlined),
    content: createVNode('h3', {}, options.message),
    okText: 'Có',
    okType: 'primary',
    okButtonProps: {
      type: 'primary',
      danger: true,
    },
    cancelText: 'Không',
    centered: true,
    onOk() {
      options?.onOk();
    },
    onCancel() {
      options?.onCancel();
    },
  });
}
