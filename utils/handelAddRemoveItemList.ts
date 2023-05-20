import { useStore } from '@/store/useStore';
import { addItemList, removeItemList } from '@/services/MovieService';
import axios from 'axios';
import { message } from 'ant-design-vue';

export function handelAddItemToList(
  accountId: string,
  movieId: number,
  media_type: string
) {
  message.loading({ content: 'Đang thêm' });
  return addItemList(accountId, {
    media_type: media_type,
    media_id: movieId,
  })
    .then((response: any) => {
      if (response.data.success == true) {
        setTimeout(() => {
          message.destroy();
          ElMessage({
            type: 'success',
            message: `Thêm thành công!`,
          });
        }, 500);
        return true;
      } else {
        message.destroy();
        ElMessage({
          type: 'error',
          message: `Thêm thất bại!`,
        });
        return false;
      }
    })
    .catch((e) => {
      message.destroy();
      ElMessage({
        type: 'error',
        message: `Thêm thất bại!`,
      });
      if (axios.isCancel(e)) return false;
    });
}

export function handelRemoveItemFromList(accountId: string, movieId: number) {
  message.loading({ content: 'Đang xóa' });

  return removeItemList(accountId, {
    media_id: movieId,
  })
    .then((movieRespone: any) => {
      if (movieRespone.data?.success == true) {
        setTimeout(() => {
          message.destroy();
          ElMessage({
            type: 'success',
            message: `Xóa thành công!`,
          });
        }, 500);
        return true;
      } else {
        message.destroy();
        ElMessage({
          type: 'error',
          message: `Xóa thất bại!`,
        });
        return false;
      }
    })
    .catch((e) => {
      message.destroy();
      ElMessage({
        type: 'error',
        message: `Xóa thất bại!`,
      });
      if (axios.isCancel(e)) return false;
    });
}
