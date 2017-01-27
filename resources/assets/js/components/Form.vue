<template>
    <div>
        <div class="row">
            <div class="col-md-3 col-md-offset-3">
                <form @submit.prevent="onSubmit">
                    <h1>files discovered</h1>
                    <div :class="['form-group', errorFile ? 'has-error' : '']">
                        <select v-model="selected" class="form-control" size="5" required>
                            <option v-for="file in files">
                                {{ file }}
                            </option>
                            <option v-if="files.length == 0" disabled>no new videos</option>
                        </select>
                        <p v-for="error in errors.file_name" class="error-message">{{ error }}</p>
                    </div>

                    <h1>file information</h1>
                    <div :class="['form-group', errorOwner ? 'has-error' : '']">
                        <label>owner name:</label>
                        <input v-model="ownerName" class="form-control" type="text" required>
                        <p v-for="error in errors.owner_name" class="error-message">{{ error }}</p>
                    </div>
                    <div :class="['form-group', errorDescription ? 'has-error' : '']">
                        <label>description:</label>
                        <textarea v-model="description" class="form-control" rows="7" required></textarea>
                        <p v-for="error in errors.description" class="error-message">{{ error }}</p>
                    </div>
                    <button type="submit" class="btn btn-lg btn-default pull-right">Submit</button>
                </form>
            </div>

            <div class="col-md-3">
                <h1>files submitted</h1>
                <form>
                    <div class="form-group">
                        <select v-model="submittedSelectedId" class="form-control" size="7" required>
                            <option v-for="file in submittedFiles" :value="file.id">
                                {{ file.file_name }}
                            </option>
                            <option v-if="submittedFiles.length == 0" disabled>no videos submitted</option>
                        </select>
                    </div>
                    <router-link :to="{ name: 'form.edit', params: { id : this.submittedSelectedId } }" class="btn btn-lg btn-primary">Edit</router-link>
                    <button @click.prevent="deleteFileEntry" class="btn btn-lg btn-danger">Delete</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                files: [],
                errors: {},
                selected: '',
                ownerName: '',
                description: '',
                submittedFiles: [],
                submittedSelectedId: ''
            }
        },
        computed: {
            errorFile : function() {
                return this.hasError('file_name');
            },
            errorOwner : function() {
                return this.hasError('owner_name');
            },
            errorDescription : function() {
                return this.hasError('description');
            }
        },
        methods: {
            onSubmit : function() {
                var data = {
                    'owner_name' : this.ownerName,
                    'description' : this.description,
                    'file_name' : this.selected.toString()
                };

                axios.post('/api/form', data).then((response) => {
                    this.refresh();
                    this.description = '';
                }, (error) => {
                    this.errors = error.response.data;
                });
            },
            deleteFileEntry : function() {
                var id = this.submittedSelectedId;
                axios.delete('/api/form/' + id).then((response) => {
                    this.refresh();
                }, (error) => {
                    console.log(error.response.data);
                });
            },
            getFiles : function() {
                axios.get('/api/file').then((response) => {
                    this.files = response.data;
                }, (error) => {
                    console.log(error.response.data);
                });
            },
            getSubmittedFiles : function() {
                axios.get('/api/form').then((response) => {
                    this.submittedFiles = response.data;
                }, (error) => {
                    console.log(error.response.data);
                });
            },
            refresh : function() {
                this.getFiles();
                this.getSubmittedFiles();
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
            this.refresh();
        }
    }
</script>
