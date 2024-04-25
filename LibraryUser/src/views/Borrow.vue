<template>
  <div>
    <h4><b>Danh sách sách đang mượn</b></h4><br>
    <BorrowList :borrows="borrow" @return-book="handleReturnBook" />
  </div>
</template>

<script>
import BorrowList from "@/components/BorrowList.vue";
import BookDetailService from "@/services/bookDetail.service";

export default {
  data() {
    return {
      borrow: [],
    };
  },

  components: {
    BorrowList,
  },

  methods: {
    async retrieveBorrowed() {
      try {
        // Gọi API để lấy thông tin về sách đã mượn
        this.borrow = await BookDetailService.getBorrow();
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Đã xảy ra lỗi khi lấy thông tin sách đã mượn:", error);
      }
    },

    async handleReturnBook(borrow) {
      try {
        // Gọi phương thức trả sách từ service và truyền thông tin về sách cần trả
        await BookDetailService.return(borrow._id);
        // Cập nhật lại danh sách sách đang mượn sau khi trả sách thành công
        this.retrieveBorrowed();
      } catch (error) {
        console.error("Đã xảy ra lỗi khi trả sách:", error);
      }
    },
  },

  mounted() {
    // Gọi hàm để lấy thông tin sách đang mượn khi component được mount
    this.retrieveBorrowed();
  },
};
</script>
