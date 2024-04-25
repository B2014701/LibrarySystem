<template>
    <div class="Log-Group" v-if="!checkLogin">
        <div class="float-right">
            <button type="button" class="btn btn-outline-primary btn-sm " data-toggle="modal" data-target="#SignInModal"
                data-whatever="@getbootstrap">ĐĂNG KÝ</button>
        </div>
        <div class="modal fade" id="SignInModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form @submit="submitUser" :validation-schema="SignInSchema">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Đăng ký</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <div class="form-group">
                                <label for="username1" class="col-form-label">Tên đăng nhập:</label>
                                <Field name="username" id="username1" type="text" class="form-control"
                                    v-model="userSignIn.username" />
                                <ErrorMessage name="username" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="password1" class="col-form-label">Mật khẩu:</label>
                                <Field name="password" id="password1" type="password" class="form-control"
                                    v-model="userSignIn.password" />
                                <ErrorMessage name="password" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="confirm_password" class="col-form-label">Nhập lại mật khẩu:</label>
                                <Field name="confirm_password" id="confirm_password" type="password" class="form-control"
                                    />
                                <ErrorMessage name="confirm_password" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="address1" class="col-form-label">Địa chỉ:</label>
                                <Field name="address" id="address1" type="text" class="form-control"
                                    v-model="userSignIn.address" />
                                <ErrorMessage name="address" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="phone1" class="col-form-label">Số điện thoại:</label>
                                <Field name="phone" id="phone1" type="text" class="form-control"
                                    v-model="userSignIn.phone" />
                                <ErrorMessage name="phone" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="role1" class="col-form-label">Chức vụ:</label>
                                <Field name="role" id="role1" as="select" class="form-control"
                                    v-model="userSignIn.role" >
                                    <option value=""></option>    
                                    <option value="user">Học Sinh - Sinh Viên</option>    
                                    <option value="manager">Đi Làm</option>    
                                    <option value="more">Khác</option>    
                                </Field>
                                <ErrorMessage name="role" class="error-feedback" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn_dismiss" data-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" @click="SignUpUser">Đăng ký</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p id="display-user"> <box-icon color="white" type='solid' name='user-rectangle'></box-icon> <span>{{ localUser.username}}</span></p>
        <button id="logOut" type="button" class="btn btn-outline-danger btn-sm" @click="logOut"><span>Đăng xuất</span> <box-icon color="#dc3545" name='door-open' type='solid' ></box-icon></button>
    </div>
</template>

<script>
import "boxicons";
import $ from 'jquery';
import UsersService from "@/services/user.service.js";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import router from '../router';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        $
    },

    data() {
        const SignInSchema = yup.object().shape({
            username: yup.string().required("Username không được trống.")
                .max(50, "Username có nhiều nhất 50 ký tự"),

            password: yup.string().required("Mật khẩu không được trống.")
                .max(50, "Mật khẩu không được quá 50 ký tự"),

            confirm_password: yup.string().required("Nhập lại mật khẩu không được trống.")
                .max(50, "Nhập lại mật khẩu không được quá 50 ký tự")
                .when("password", (password, field) => password ? field.required().oneOf([yup.ref('password')], "Không đúng mật khẩu") : field),
            
            address: yup.string().required("Địa chỉ không được trống.")
                .max(200, "Địa chỉ không được vượt quá 200 ký tự.")
                .min(6, "Địa chỉ quá ngắn"),
            
            phone: yup.string().required("Số điện thoại không được để trống."),

            role: yup.string().required("Chức vụ không được để trống.")
                .max(50, "Chức vụ quá dài."),
        });

        return {
            checkLogin: localStorage.getItem("user") != "" ? true : false,
            localUser: localStorage.getItem("user"),   
            user: [],
            userLogin: [],
            userSignIn: [],
            users: [],
            localUser: (JSON.parse(localStorage.getItem("user"))),
            LogStatus: false,
            SignInSchema,
        }
    },

    watch:{
    },

    methods: {
        // Tìm so sánh username và password với CSDL có thì trả về thông tin tài khoản đó
        // async submitUser() {
        //     try {
        //         //Thiếu onSubmit là hiển thị Error message
        //         this.user = await UsersService.login(this.userLogin.username, this.userLogin.password);
        //         alert("Login complete");
        //         $('.btn_dismiss').click();
        //         this.LogStatus = true;
        //         localStorage.setItem("user", JSON.stringify(this.user));
        //         this.localUser = (JSON.parse(localStorage.getItem("user")));
                
        //     } catch (error) {
        //         console.error();
        //     }
        // },

        // Đăng xuất
        logOut(){
            this.LogStatus = false;
            localStorage.removeItem("user");
            this.localUser = [];
            this.checkLogin = false;
            router.push('/');
        },

        //Đăng ký
        async SignUpUser(){
            try{
                await UsersService.create(this.userSignIn);
                alert("Đăng ký thành công!")
            } catch (error){
                alert("Lỗi xảy ra khi đăng ký");
            }
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
#display-user {
    display: inline-block;
    position: relative;
    top: 8px;
    left: 8px;
    line-height: 20px;
    font-size: 20px;
    color: white;
}

p#display-user span{
    font-size: 18px;
    vertical-align: 7px;
    font-weight: 700;

}

p#display-user box-icon{
    margin-right: 2px;
}

button#logOut{
    margin-left: 30px;
}

button#logOut span{
    vertical-align: 4px;
    font-weight: 700;
}

button#logOut box-icon{
    vertical-align: -2px;
}
</style>