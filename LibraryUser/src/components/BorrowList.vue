<template>
  <div class="borrowBox" v-for="(borrow, index) in borrows" :key="index">
    <dl>
      <dd></dd>
      <dd class="detailField">Mã số sách mượn:</dd>
      <dd class="detailValue">{{ borrow._id }}</dd>
      <dd></dd>
      <dd class="detailField">Ngày mượn:</dd>
      <dd class="detailValue">{{ formatDate(borrow.borrowDate) }}</dd>
      <dd></dd>
      <dd class="detailField">Ngày dự kiến trả:</dd>
      <dd class="detailValue">{{ formatDate(borrow.returnDate) }}</dd>
      <dd></dd>
      <dd class="detailField">Trạng thái trả:</dd>
      <dd class="detailValue">
        <span>{{ borrow.available ? 'Đã trả' : 'Đang mượn' }}</span>
        <span v-if="!borrow.available">&nbsp;</span>
        <button v-if="!borrow.available" @click="returnBook(borrow)" class="btn-return">Trả sách</button>
      </dd>
      <dd></dd>
    </dl>
  </div>
</template>

<script>
import "boxicons";

export default {
  props: {
    borrows: { type: Array, default: [] },
  },
  methods: {
    formatDate(dateString) {
      const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Định dạng mm/dd/yyyy
      if (!regex.test(dateString)) {
        return "Ngày không hợp lệ";
      }

      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Ngày không hợp lệ";
      } else {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
      }
    },
    returnBook(borrow) {
      // Gọi phương thức returnBook và truyền thông tin về sách cần trả lên component cha
      this.$emit('return-book', borrow);
    }
  }
}
</script>

<style scoped>
.borrowBox{ 
  border-radius: 30px;
  padding-top: 20px;
  padding-left: 30px;
  padding-bottom: 5px;
  margin-bottom: 30px;
  background-color: #F2E9E4;
}
.detailField {
  width: 30%;
  display: inline-flex;
  font-weight: 700;
}
.detailValue {
  width: 70%;
  display: inline;
}
.detailField, .detailValue {
  align-content: center;
}
.btn-return {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 8px;
}
.btn-return:hover {
  background-color: #0056b3;
}
</style>
