<template>
    <div>
        <div class="row">
            <div class="col-md-3 col-md-offset-3">
                <h1>edit file information</h1>
                <form @submit.prevent="submitUpdate">
                    <div :class="['form-group', errorOwner ? 'has-error' : '']">
                        <label>file name: {{ this.fileName }}</label><br />
                        <label>owner name:</label>
                        <input v-model="ownerName" class="form-control" type="text" required>
                        <p v-for="error in errors.owner_name" class="error-message">{{ error }}</p>
                    </div>
                    <div :class="['form-group', errorDescription ? 'has-error' : '']">
                        <label>description:</label>
                        <textarea v-model="description" class="form-control" rows="7" required></textarea>
                        <p v-for="error in errors.description" class="error-message">{{ error }}</p>
                    </div>
                    <button type="submit" class="btn btn-lg btn-default pull-right">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: 0,
                errors: {},
                fileName: '',
                ownerName: '',
                description: ''
            }
        },
        computed: {
            errorOwner : function() {
                return this.hasError('owner_name');
            },
            errorDescription : function() {
                return this.hasError('description');
            }
        },
        methods: {
            submitUpdate : function() {
                var data = {
                    'owner_name' : this.ownerName,
                    'description' : this.description
                },
                    id = this.id;

                axios.patch('/api/form/' + id, data).then((response) => {
                    this.$router.push({ name: 'home' });
                }, (error) => {
                    this.errors = error.response.data;
                });
            },
            getFileInfo : function() {
                var id = this.id;
                axios.get('/api/form/' + id).then((response) => {
                    this.fileName = response.data.file_name;
                    this.ownerName = response.data.owner_name;
                    this.description = response.data.description;
                }, (error) => {
                    console.log(error.response.data);
                });
            },
            hasError : function(field) {
                if(typeof this.errors[field] != 'undefined' && this.errors[field].length > 0)
                {
                    return true;
                }
                return false;
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getFileInfo();
        }
    }
</script>
