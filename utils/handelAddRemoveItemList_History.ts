import { useStore } from '@/store/useStore';
import {
  addItemList,
  removeItemList,
  removeItemHistory,
  removeAllItemList,
  removeAllItemHistory,
} from '~/services/appMovieService';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { ElNotification, ElMessage } from 'element-plus';

export async function handelAddItemToList(
  movieId: number,
  media_type: string
): Promise<boolean> {
  // message.loading({ content: 'Đang thêm' });
  return addItemList({
    media_type: media_type,
    media_id: movieId,
  })
    .then((response: any) => {
      if (response.data.success == true) {
        // message.destroy();
        // ElMessage({
        //   type: 'success',
        //   message: `Thêm thành công!`,
        // });

        ElNotification({
          title: 'Thành công!',
          message: 'Thêm phim vào danh sách thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000,
        });

        return true;
      } else {
        message.destroy();
        // ElMessage({
        //   type: 'error',
        //   message: `Thêm thất bại!`,
        // });

        ElNotification({
          title: 'Thất bại!',
          message: 'Thêm phim vào danh sách thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000,
        });
        return false;
      }
    })
    .catch((e) => {
      message.destroy();
      ElNotification({
        title: 'Thất bại!',
        message: 'Thêm phim vào danh sách thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000,
      });
      if (axios.isCancel(e)) return false;
      return false;
    });
}

export async function handelRemoveItemFromList(
  movieId: number
): Promise<boolean> {
  // message.loading({ content: 'Đang xóa' });

  return removeItemList({
    media_id: movieId,
  })
    .then((movieRespone: any) => {
      if (movieRespone.data?.success == true) {
        message.destroy();
        // ElMessage({
        //   type: 'success',
        //   message: `Xóa thành công!`,
        // });

        ElNotification({
          title: 'Thành công!',
          message: 'Xóa phim khỏi danh sách thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000,
        });

        return true;
      } else {
        message.destroy();
        // ElMessage({
        //   type: 'error',
        //   message: `Xóa thất bại!`,
        // });

        ElNotification({
          title: 'Thất bại!',
          message: 'Xóa phim khỏi danh sách thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000,
        });
        return false;
      }
    })
    .catch((e) => {
      message.destroy();
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa phim khỏi danh sách thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000,
      });
      if (axios.isCancel(e)) return false;
      return false;
    });
}

export async function handleRemoveAllitemFromList(): Promise<boolean> {
  // message.loading({ content: 'Đang xóa tất cả Danh sách phát' });

  return removeAllItemList()
    .then((movieRespone) => {
      if (movieRespone.data?.success == true) {
        message.destroy();
        // ElMessage({
        //   type: 'success',
        //   message: `Xóa thành công!`,
        // });
        ElNotification({
          title: 'Thành công!',
          message: 'Xóa tất cả phim khỏi lịch sử xem thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000,
        });

        return movieRespone.data?.results?.length == 0;
      } else {
        message.destroy();
        // ElMessage({
        //   type: 'error',
        //   message: `Xóa thất bại!`,
        // });
        ElNotification({
          title: 'Thất bại!',
          message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000,
        });
        return false;
      }
    })
    .catch((e) => {
      message.destroy();
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000,
      });
      if (axios.isCancel(e)) return false;
      return false;
    });
}

export async function handleRemoveItemFromHistory(
  movieId: number
): Promise<boolean> {
  // message.loading({ content: 'Đang xóa' });

  return removeItemHistory({
    media_id: movieId,
  })
    .then((movieRespone: any) => {
      if (movieRespone.data?.success == true) {
        message.destroy();
        // ElMessage({
        //   type: 'success',
        //   message: `Xóa thành công!`,
        // });

        ElNotification({
          title: 'Thành công!',
          message: 'Xóa phim khỏi lịch sử xem thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000,
        });
        return true;
      } else {
        message.destroy();
        // ElMessage({
        //   type: 'error',
        //   message: `Xóa thất bại!`,
        // });

        ElNotification({
          title: 'Thất bại!',
          message: 'Xóa phim khỏi lịch sử xem thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000,
        });
        return false;
      }
    })
    .catch((e) => {
      message.destroy();
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa phim khỏi lịch sử xem thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000,
      });
      if (axios.isCancel(e)) return false;
      return false;
    });
}

export async function handleRemoveAllitemFromHistory(): Promise<boolean> {
  // message.loading({ content: 'Đang xóa tất cả Lịch sử xem' });

  return removeAllItemHistory()
    .then((movieRespone) => {
      if (movieRespone.data?.success == true) {
        message.destroy();
        ElNotification({
          title: 'Thành công!',
          message: 'Xóa tất cả phim khỏi lịch sử xem thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000,
        });
        return movieRespone.data?.results?.length == 0;
      } else {
        message.destroy();
        ElNotification({
          title: 'Thất bại!',
          message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000,
        });
        return false;
      }
    })
    .catch((e) => {
      message.destroy();
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000,
      });
      if (axios.isCancel(e)) return false;
      return false;
    });
}
