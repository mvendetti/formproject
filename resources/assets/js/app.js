import Vue from 'vue'
import axios from 'axios'

Vue.component('form-app', {
    template: `
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
                                <!-- <option v-if="files.length == 0">no videos in directory</option> -->
                            </select>
                            <p v-for="error in errors.file_name" class="error-message">{{ error }}</p>
                        </div>

                        <h1>file information</h1>
                        <span>video selected: {{ selected }}</span>
                        <div :class="['form-group', errorOwner ? 'has-error' : '']">
                            <label>owner name:</label>
                            <input v-model="ownerName" class="form-control" type="text" required>
                            <p v-for="error in errors.owner_name" class="error-message">{{ error }}</p>
                        </div>
                        <div :class="['form-group', errorDescription ? 'has-error' : '']">
                            <label>description:</label>
                            <input v-model="description" class="form-control" type="text" required>
                            <p v-for="error in errors.description" class="error-message">{{ error }}</p>
                        </div>
                        <button type="submit" class="btn btn-lg btn-default pull-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            files: [],
            selected: '',
            ownerName: '',
            description: '',
            errors: {}
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
                console.log(response);
            }, (error) => {
                this.errors = error.response.data;
                // console.log(error.response.data);
            });
        },
        getFiles : function() {
            axios.get('/api/file').then((response) => {
                this.files = response.data;
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
        this.getFiles();
    }
})

const app = new Vue({
    el: '#app'
})
