<div id="register" class="animate form registration_form">
	<section class="login_content">
		<form method="POST" action="{{ route('sipeda_registered') }}" id="UserFormRegistration">
			<h1>Create Account</h1>
          	<div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					Nama Badan Usaha <span class="required">*</span>
  					<span id="form--error--message--nama_perusahaan" class="form--error--message pull-right"></span>
  				</label>
              	<input type="text" name="nama_perusahaan" id="nama_perusahaan" class="form-control" placeholder="Nama Badan Usaha"/>
          	</div>
      		<div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					Email <span class="required">*</span><span id="result"></span>
  					<span id="form--error--message--email" class="form--error--message pull-right"></span>
  				</label>
        		<input type="email" name="email" id="email" class="form-control" placeholder="Email"/>
      		</div>

          <div class="form-group">
              <label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
            Password <span class="required">*</span><span id="result"></span>
            <span id="form--error--message--email" class="form--error--message pull-right"></span>
          </label>
            <input type="password" name="password" id="password" class="form-control" placeholder="Password"/>
          </div>

      		<div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					Npwp <span class="required">*</span>
  					<span id="form--error--message--npwp" class="form--error--message pull-right"></span>
  				</label>
        		<input type="text" name="npwp" id="npwp" class="form-control" placeholder="Npwp"/>
      		</div>
      		
      		<div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					Nama Pimpinan <span class="required">*</span>
  					<span id="form--error--message--pimpinan_perusahaan" class="form--error--message pull-right"></span>
  				</label>
        		<input type="text" name="pimpinan_perusahaan" id="pimpinan_perusahaan" class="form-control" placeholder="Nama Pimpinan"/>
      		</div>
      		
      		<div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					Kepemilikan Saham <span class="required">*</span>
  					<span id="form--error--message--kepemilikan_saham" class="form--error--message pull-right"></span>
  				</label>
        		<input type="text" name="kepemilikan_saham" id="kepemilikan_saham" class="form-control" placeholder="Kepemilikan Saham"/>
      		</div>
      		
      		<div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					Contact Person / PIC Nama <span class="required">*</span>
  					<span id="form--error--message--pic_name" class="form--error--message pull-right"></span>
  				</label>
        		<input type="text" name="pic_name" id="pic_name" class="form-control" placeholder="Nama"/>
      		</div>
      		
      		<div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					Contact Person / PIC Nomer Telpon <span class="required">*</span>
  					<span id="form--error--message--pic_phone_number" class="form--error--message pull-right"></span>
  				</label>
        		<input type="text" name="pic_phone_number" id="pic_phone_number" class="form-control" placeholder="Nomer Telpon "/>
      		</div>
      		
      		<div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					Contact Person / PIC Email <span class="required">*</span>
  					<span id="form--error--message--pic_email" class="form--error--message pull-right"></span>
  				</label>
        		<input type="text" name="pic_email" id="pic_email" class="form-control" placeholder="Email "/>
      		</div>
			<div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					Klasifikasi
  				</label>
          		<ul class="to_do">
            		<li>
              			<p>
			                <div class="checkbox icheck-primary">
			                    <input class="checkbox__data" type="checkbox" name="is_ipp" id="is_ipp" value="1"/>
			                    <label for="is_ipp">IPP</label>
			                </div>
              			</p>
            		</li>
		            <li>
			            <p>
			                <div class="checkbox icheck-primary">
			                    <input class="checkbox__data" type="checkbox" name="is_pabrikan" id="saab" value="1"/>
			                    <label for="saab">Pabrikan</label>
			                </div>
			            </p>
		            </li>
		            <li>
		              	<p>
		                	<div class="checkbox icheck-primary">
		                    	<input class="checkbox__data" type="checkbox" name="is_plts" id="is_plts" value="1"/>
		                    	<label for="is_plts">PLTS</label>
		                	</div>
		              	</p>
		            </li>
          		</ul>
            </div>
            <div class="form-group">
          		<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
  					
  				<hr/>
  				</label>
  				<ul class="to_do">
	              	<li>
                  		<div class="checkbox icheck-primary">
                      		<input class="checkbox__data" type="checkbox" name="agree" id="check__agree"/>
                      		<label for="check__agree">I have read and agree to the Terms and Conditions and Privacy Policy</label>
                      		<!-- Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy -->
                  		</div>
	              	</li>
            	</ul>
      		</div>
      		<div class="separator">
      			<p class="change_link pull-left">Already have account ?
          			<a href="#job" class="to_proyek"> Log in </a>
        		</p>
                <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
        		<button type="submit" id="submit__button__registration" class="btn btn-primary submit pull-right">Register</button>
      		</div>
      	</form>
    </section>
</div>