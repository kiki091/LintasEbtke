<div id="app">
	<div class="bg__gray">
		<div class="page-title">
			<div class="title_left">
		        <h3>CONTACT US</h3>
		        <p>CONTENT MANAGEMENT SYSTEM</p>
		    </div>
		</div>
	</div>
    
    <div v-if="showModal == true" class="popup__mask__alert">
        <div class="popup__wrapper__alert">
            <div class="popup__layer__alert">
                <div class="alert__message__wrapper">
                    <div class="alert__message">
                        <img src="{{ asset('themes/ebtke/cms/images/logo-alert.png') }}" alt="">
                        <h3>Alert!</h3>
                        <label>Are you sure that you want to delete this?</label>
                    </div>
                    <div class="alert__message__btn">
                        <div class="new__form__btn">
                            <a href="#" class="btn__form__reset" @click.prevent="closeDeleteModal">Cancel</a>
                            <a href="#" class="btn__form__create" @click="deleteData(delete_payload.id)">Confirm</a>
                        </div>
                    </div>
                    <button class="alert__message__close" @click.prevent="closeDeleteModal"></button>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12">
    	<!-- Include form -->
    	@include('ebtke.cms.pages.message.contact-us.partials.form')
    	<!-- / End include form -->

    	<!-- Main Banner -->
    	<div class="main__content__layer contact_us_table">
			<div class="content__top flex-between">
				<div class="content__title">
					<h2>@{{ form_add_title }}</h2>
				</div>
		    </div>
		    <div class="content__bottom">
		    	<table class="table__style" align="center" cellpadding="0" cellspacing="0">
		    		<tbody>
		    			<tr>
		    				<th>#</th>
		    				<th>Fullname</th>
		    				<th>Email</th>
		    				<th>Options</th>
		    			</tr>
		    			<tr v-for="(contact_us, index) in responseData.contact_us">
		    				<td>@{{ index+1 }}</td>
		    				<td>@{{ contact_us.fullname }}</td>
		    				<td>@{{ contact_us.email }}</td>
		    				<td>
		    					<a href="javascript:void(0);" class="title__name content__edit__hover" title="Show Data" @click="showData(contact_us.id)">
		    					<i class="fa fa-plus fa-lg"></i>
		    					</a>
		    					<a href="javascript:void(0);" class="btn__delete" title="Delete Data" @click="showDeleteModal(contact_us.id)">
                                    <i class="fa fa-trash fa-lg"></i>
                                </a>
                            </td>
                        </tr>
		    		</tbody>
		    	</table>
			</div>
		</div>
    	<!-- End Main Banner -->

    </div>
</div>
