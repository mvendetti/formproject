import Vue from 'vue'
import axios from 'axios'

Vue.component('form-app', {
    template: `
        <div>
            <div class="row">
                <div class="col-md-3 col-md-offset-3">
                    <h1>files discovered</h1>
                    <div class="form-group">
                        <select v-model="selected" class="form-control" size="5">
                            <option v-for="file in files">
                                {{ file }}
                            </option>
                            <!-- <option v-if="files.length == 0">no videos in directory</option> -->
                        </select>
                    </div>
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
            selected: '',
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

            axios.post('/api/form', data).then((response) => {
                console.log(response);
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
        }
    },
    created() {
        this.getFiles();
    }
})

const app = new Vue({
    el: '#app'
})
