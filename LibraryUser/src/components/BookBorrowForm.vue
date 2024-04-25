<template>
  <Form @submit="submitBorrow" :validation-schema="bookBorrowFormSchema">
    <div class="form-group">
      <label for="bookDetail_id">Mã sách:</label>
      <Field
        :disabled="true"
        name="bookDetail_id"
        type="text"
        class="form-control"
        v-model="bookLocalDetailId"
      />
      <ErrorMessage name="bookDetail_id" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="name">Tên sách:</label>
      <Field
        :disabled="true"
        name="name"
        type="text"
        class="form-control"
        v-model="bookLocalName"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="username">Tên tài khoản người mượn:</label>
      <Field
        name="username"
        type="text"
        class="form-control"
        v-model="username"
      />
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="borrowDate">Ngày mượn sách:</label>
      <Field
        name="borrowDate"
        type="date"
        class="form-control"
        v-model="borrowDate"
      />
      <ErrorMessage name="borrowDate" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="returnDate">Ngày dự kiến trả sách:</label>
      <Field
        name="returnDate"
        type="date"
        class="form-control"
        v-model="returnDate"
      />
      <ErrorMessage name="returnDate" class="error-feedback" />
      <div v-if="showReturnDateError" class="error-feedback">Ngày dự kiến trả không được quá 14 ngày sau ngày mượn.</div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import bookDetailService from "@/services/bookDetail.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    bookDetailId: { type: String, required: true },
    bookName: { type: String, required: true },
  },
  data() {
    const currentDate = new Date();
    const defaultDate = currentDate.toLocaleDateString('en-US');

    const bookBorrowFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Thiếu tên tài khoản người mượn")
        .max(100, "Tên tài khoản người mượn có tối đa 100 ký tự"),
      borrowDate: yup.date().required("Thiếu ngày mượn sách"),
      returnDate: yup
        .date()
        .min(yup.ref("borrowDate"), "Ngày dự kiến trả không được quá 14 ngày sau ngày mượn")
        .test(
          "is-later-than-borrow-date",
          "Ngày dự kiến trả không được quá 14 ngày sau ngày mượn",
          (value) => {
            const borrowDate = new Date(this.borrowDate);
            const returnDate = new Date(value);
            returnDate.setDate(borrowDate.getDate() + 14);
            const isValid = value <= returnDate;
            this.showReturnDateError = !isValid;
            return isValid;
          }
        )
        .required("Thiếu ngày dự kiến trả sách"),
    });

    return {
      bookLocalDetailId: this.bookDetailId,
      bookLocalName: this.bookName,
      username: "",
      borrowDate: defaultDate,
      returnDate: "",
      showReturnDateError: false,
      bookBorrowFormSchema,
    };
  },
  methods: {
    submitBorrow() {
      this.$emit("submit:bookBorrow", {
        borrow_id: this.bookLocalDetailId,
        username: this.username,
        borrowDate: this.borrowDate,
        returnDate: this.returnDate,
      });
    },
  },
};
</script>

<style scoped>
</style>
