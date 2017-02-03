<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Login</div>
                    <div class="panel-body">
                        <form class="form-horizontal" @submit.prevent="login">
                            <div :class="['form-group', errorEmail ? 'has-error' : '']">
                                <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input v-model="email" id="email" type="email" class="form-control" name="email" required autofocus>
                                    <span class="help-block"><p v-for="error in errors.email" class="error-message">{{ error }}</p></span>
                                </div>
                            </div>

                            <div :class="['form-group', errorPassword ? 'has-error' : '']">
                                <label for="password" class="col-md-4 control-label">Password</label>

                                <div class="col-md-6">
                                    <input v-model="password" id="password" type="password" class="form-control" name="password" required>
                                    <span class="help-block"><p v-for="error in errors.password" class="error-message">{{ error }}</p></span>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <div class="checkbox">
                                        <label>
                                            <!-- <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : ''}}> Remember Me -->
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-8 col-md-offset-4">
                                    <button type="submit" class="btn btn-lg btn-primary">Login</button>
                                    <a class="btn btn-link" href="/password/reset">Forgot Your Password?</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                errors: '',
                password: ''
            }
        },
        computed: {
            errorEmail : function() {
                return this.hasError('email');
            },
            errorPassword : function() {
                return this.hasError('password');
            }
        },
        methods: {
            login : function() {
                var data = {
                    'email' : this.email,
                    'password' : this.password
                };
                axios.post('/api/login', data).then((response) => {
                    this.$router.push({ name: 'form' });
                }, (error) => {
                    this.errors = error.response.data;
                });
            },
            hasError : function(field) {
                if(typeof this.errors[field] != 'undefined' && this.errors[field].length > 0)
                {
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style lang="sass">

</style>
