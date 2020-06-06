<template>
    <v-dialog value="true" max-width="500" @click:outside="dismiss">
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>请登录</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="mt-4">
                <v-alert type="error" outlined v-if="authFail">
                    <strong>登录失败！</strong> 请检查您的登录信息然后重试。
                </v-alert>
                <v-form v-on:submit.prevent="login()">
                    <v-text-field label="账号" v-model="formData.username" prepend-icon="person" type="text"/>
                    <v-text-field label="密码" v-model="formData.password" prepend-icon="lock" type="password"/>
                    <!-- 腾讯验证码 -->
                    <v-btn type="submit" color="primary" block>登录</v-btn>
                </v-form>
            </v-card-text>
            <v-card-text>
                <a href="javascript:void(0)" class="v-link">忘记密码？</a>
                <a href="javascript:void(0)" class="v-link float-right">注册一个新账号</a>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
import {API} from '@/components/util/consts';

export default {
    name: 'LoginDialog',
    data: () => ({
        authFail: null,
        formData: {
            username: null,
            password: null,
            rememberMe: true
        }
    }),
    methods: {
        login() {
            axios.post(API.login, this.formData).then(res => {
                let {accessToken, refreshToken} = res.data;
                if (this.formData.rememberMe) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                } else {
                    sessionStorage.setItem('accessToken', accessToken);
                    sessionStorage.setItem('refreshToken', refreshToken);
                }
                this.authFail = false;
                this.dismiss();
            }).catch(() => {
                this.authFail = true;
            });
        },
        dismiss() {
            this.$emit('dismiss', this.authFail);
        }
    }
};
</script>