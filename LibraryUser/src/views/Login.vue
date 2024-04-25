<template>
    <div class="page">
        <h4><b>Đăng nhập</b></h4>
        <Form
        @submit="submitUser"
        :validation-schema="loginFormSchema" 
    >
        <div id="username-area" class="form-group">
            <label for="username">Username:</label>
            <Field
                name="username"
                type="text"
                class="form-control"
                v-model="userLogin.username"
            />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div id="password-area" class="form-group">
            <label for="password">Mật khẩu:</label>
            <Field
                name="password"
                type="password"
                class="form-control"
                v-model="userLogin.password"
            />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button id="submit" class="btn btn-success">Đăng nhập <box-icon type='solid' name='lock-open' color="white"></box-icon></button>
        </div>
    </Form>
    </div>
</template>

<script>
import "boxicons";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UsersService from "@/services/user.service.js";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    data(){
        const loginFormSchema = yup.object().shape({
            'username': yup
                .string()
                .required("Thiếu username.")
                .max(100,'Tên có tối đa 100 ký tự.'),
            'password': yup
                .string()
                .required("Thiếu mật khẩu")
                .max(100,'Mật khẩu có tối đa 100 ký tự'),
        });
        return{
            user: [],
            localUser: [],
            userLogin: [],
            LogStatus: false,
            loginFormSchema,
        }
    },

    methods: {
        async submitUser() {
            try {
                //Thiếu onSubmit là hiển thị Error message
                this.user = await UsersService.login(this.userLogin.username, this.userLogin.password);
                console.log(this.user);
                if(this.user != [] ){
                    alert("Login complete");
                this.LogStatus = true;
                localStorage.setItem("user", JSON.stringify(this.user));
                this.localUser = (JSON.parse(localStorage.getItem("user")));
                this.$router.push('/library');
                    
                } else {
                    throw new Error("Không đúng tài khoản hoặc mật khẩu");
                }
                
            } catch (error) {
                console.error();
                alert("Không đúng mật khẩu!");
            }
        },

        // Đăng xuất
        logOut(){
            this.LogStatus = false;
            localStorage.removeItem("user");
            this.localUser = [];
        },

        // Lấy danh sách các tài khoản
        async retrieveUsers() {
            try {
                this.users = await UsersService.getAll();
            } catch (error) {
                console.error();
            }
        },
    },

    // Tự cập nhật danh sách tài khoản khi load trang
    mounted() {
        this.retrieveUsers();
    },
}
</script>

<style scoped>
.page{
    height: 570px;
    padding-top: 120px;
    padding-left: 140px;
    padding-right: 140px;
}

.page h4{
    margin-bottom: 30px;
}

#username-area{
    margin-bottom: 40px;
}

#password-area{
    margin-bottom: 40px;
}
</style>