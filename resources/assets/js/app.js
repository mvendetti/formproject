import Vue from 'vue'
import axios from 'axios'

Vue.component('form-app', {
    template: `
        <div>
            <div class="row">
                <div class="col-md-3 col-md-offset-3">
                    <h1>files discovered</h1>
                    <select v-model="selected" class="form-control" multiple>
                        <option v-for="file in files">
                            {{ file }}
                        </option>
                        <!-- <option v-if="files.length == 0">no videos in directory</option> -->
                    </select>

                    <hr/>

                    <form>
                        <fieldset>
                            <h1>file information</h1>
                            <span>video selected: {{ selected }}</span>
                            <div class="form-group">
                                <label>owner name:</label>
                                <input v-model="ownerName" class="form-control" type="text" required>
                            </div>
                            <div class="form-group">
                                <label>description:</label>
                                <input v-model="description" class="form-control" type="text" required>
                            </div>

                            <button type="submit" @click.prevent="onSubmit" class="btn btn-lg btn-default pull-right">Submit</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            files: [],
            formData: [],
            selected: [],
            ownerName: '',
            description: ''
        }
    },
    methods: {
        onSubmit : function() {
            var data = {
                'owner_name' : this.ownerName,
                'description' : this.description,
                'file_name' : this.selected.toString()
            };

            axios.post('/api/form', data)
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getFiles : function() {
            var me = this;
            axios.get('/api/file')
                .then(function(response) {
                    me.files = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getFormData : function() {
            var me = this;
            axios.get('/api/form')
                .then(function(response) {
                    me.formData = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        formSortToFileName : function() {
            var formArray = this.formData,
                filtered;
            for(var i = 0; i < formArray.length; i++) {
                filtered = formArray[i].file_name;
            }
            return filtered;
        },
        wasFilePreviouslySubmittedChecker : function() {
            //
        }
    },
    created() {
        this.getFormData();
        this.getFiles();
    }
})

const app = new Vue({
    el: '#app'
})
