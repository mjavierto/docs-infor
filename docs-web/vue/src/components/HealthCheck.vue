<template>
<div class="home">
	<main class="site-content has-sections" role="main" id="main" tabindex="-1">
		<section>
			<div class="wrapper">
				<p class="tagline">{{ $t("home.home_tagline") }}</p>
			</div>		
		</section>
        <section>
            <div class="wrapper">
                <div class="c-2-1">
                    <div class="col">
                        <div class="col-wrapper">
                            <ul class="product-item">
                                <li class="section">
                                    <table class="ui-table">
                                        <thead>
                                            <tr>
                                                <th>Docs service</th>
                                                <th>Status</th>
                                                <th>Comments</th>
                                            </tr>
                                        </thead>                                     
                                        <tbody>
                                            <tr>
                                                <td>Front end (Vue)</td>
                                                <td></td>
                                                <td>
                                                    <p>Build date: {{ build_date }}</p>
                                                    <p>Git commit hash: {{ git_commit_hash }}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>API v1</td>
                                                <td>{{ api_v1_status }}</td>
                                                <td>{{ status_comments[api_v1_status] }}</td>
                                            </tr>
                                            <tr>
                                                <td>API v2</td>
                                                <td>{{ api_v2_status }}</td>
                                                <td>{{ status_comments[api_v2_status] }}</td>
                                            </tr>
                                            <tr>
                                                <td>Infocenter (Tomcat)</td>
                                                <td>{{ tomcat_status }}</td>
                                                <td>{{ status_comments[tomcat_status] }}</td>
                                            </tr>
                                            <tr>
                                                <td>Admin Console</td>
                                                <td>{{ adminconsole_status }}</td>
                                                <td>{{ status_comments[adminconsole_status] }}</td>
                                            </tr>
                                            <tr>
                                                <td>Static Content (S3)</td>
                                                <td>{{ s3_status }}</td>
                                                <td>{{ status_comments[s3_status] }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	</main>
</div>
</template>

<script>
import BuildDate from '!raw-loader!./build_date.txt';
import GitCommitHash from '!raw-loader!./git_commit_hash.txt';

export default {
	data() {
		return {
            build_date: BuildDate,
            git_commit_hash: GitCommitHash,
            api_v1: null,
            api_v1_status: null,
            api_v2: null,
            api_v2_status: null,
            s3: null,
            s3_status: null,
            tomcat: null,
            tomcat_status: null,
            adminconsole: null,
            adminconsole_status: null,
            status_comments: {
                0: 'Request failed',
                200: 'Success',
                401: 'Unauthorized',
                404: 'Not found',
                500: 'Server error',
                503: 'Service Temporarily Unavailable'
            }
		}
    },
    created() {
        this.httpGet('adminconsole/about', 'admin');
        this.httpGet('infordocs/2x/en-us/error/404.html', 's3');
        this.httpGet('help_default/index.jsp', 'tomcat');
        this.httpGet_api_v1('api/v1/languages');
        this.httpGet_api_v2();
    },
    methods: {
        httpGet: function(endpoint, service) {
            var web_url = window.env.API_URL.replace("/api/v2", "");
            var vm = this;

            $.ajax({
                url: web_url + endpoint,
                success: function(response){
                    switch(service){
                        case 'admin':
                            vm.adminconsole = response;
                            vm.adminconsole_status = 200;
                            break;
                        case 'tomcat':
                            vm.tomcat = response;
                            vm.tomcat_status = 200;
                            break;
                        case 's3':
                            vm.s3 = response;
                            vm.s3_status = 200;
                            break;
                    }
                },
                error: function(response) {
                    switch(service){
                        case 'admin':
                            vm.adminconsole = response;
                            vm.adminconsole_status = response.status;
                            break;
                        case 'tomcat':
                            vm.tomcat = response;
                            vm.tomcat_status = response.status;
                            break;
                        case 's3':
                            vm.s3 = response;
                            vm.s3_status = response.status;
                            break;
                    }
                }
            })
        },
        httpGet_api_v1: function(endpoint) {
            var web_url = window.env.API_URL.replace("/api/v2", "");
            var output;
            var vm = this;

            var request_data = {
                url: web_url + endpoint,
                method: 'GET'
            };
            
            $.ajax({
                url: request_data.url,
                type: request_data.method,
                success: function (response) {
                    vm.api_v1 = response;
                    vm.api_v1_status = 200;
                },
                error: function(response) {
                    vm.api_v1 = response;
                    vm.api_v1_status = response.status;
                }
            });
        },
        //call get_token first, if 50x or 40x then that is status, if 200 then call activeProductsAndSolutions
        //use callbeck function in 1st api call, e.g. getDocsToken call the api if suceeeds, callback() if failed callback(statuscode) ? may not work add argument callback
        //getProductsAndSol -- two arg endpoints active products and solutions, 2nd arg anon function
        httpGet_api_v2: async function() {
            var vm = this;          

            var response = await window.env.getFromApi("web/activeProductsAndSolutions");
            if (response) {
                vm.api_v2 = response;
                vm.api_v2_status = 200;
                return;
            }

            vm.api_v2 = response;
            vm.api_v2_status = 500;
            return;
        },
        processApiV2: function(output) {
            if (output === undefined){
                this.api_v2_status = 503;
            }
            else if (output.status !== undefined){
                this.api_v2_status = output.status;
            }
            else {
                this.api_v2 = output;
                this.api_v2_status = 200;
            }            
        }
    },
}

$(document).ready(function () {	
})

</script>
