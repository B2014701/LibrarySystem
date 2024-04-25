<template>
    <div class="borrowBox" v-for="(borrow, index) in borrows" :key="index">
      <dl>
        <dd></dd>
        <dd class="detailField">Mã số sách mượn:</dd>
        <dd class="detailValue">{{ borrow._id }}</dd>
        <dd></dd>
        <dd class="detailField">Số lần mượn của sách:</dd>
        <dd class="detailValue">{{ borrow.borrowCount }}</dd>
        <dd></dd>
        <dd class="detailField">Tên tài khoản người mượn:</dd>
        <dd class="detailValue">{{ borrow.username }}</dd>
        <dd></dd>
        <dd class="detailField">Trạng thái trả:</dd>
        <dd class="detailValue">
          <span>{{ borrow.available ? 'Đã trả' : 'Đang mượn' }}</span>
          <span v-if="!borrow.available">&nbsp;</span>
        </dd>
        <dd></dd>
      </dl>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      borrows: { type: Array, default: [] },
    },
  };
  </script>
  
  <style scoped>
  .borrowBox {
    border-radius: 30px;
    padding-top: 20px;
    padding-left: 30px;
    padding-bottom: 5px;
    margin-bottom: 30px;
    background-color: #f2e9e4;
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
  .detailField,
  .detailValue {
    align-content: center;
  }
  </style>
  