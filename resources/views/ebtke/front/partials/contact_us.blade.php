<!-- 

   __________  _   ___________   ____________   __  _______
  / ____/ __ \/ | / /_  __/   | / ____/_  __/  / / / / ___/
 / /   / / / /  |/ / / / / /| |/ /     / /    / / / /\__ \ 
/ /___/ /_/ / /|  / / / / ___ / /___  / /    / /_/ /___/ / 
\____/\____/_/ |_/ /_/ /_/  |_\____/ /_/     \____//____/  
                                                           

                                                            -->
<div id="desktop__content" class="ac-container">
	<div>
		<input class="ac" id="ac-1" name="accordion-1" type="checkbox" />
		<label for="ac-1"><i class="fa fa-wechat"></i> Contact Us</label>
		<article class="ac-small">
			<form action="{{ route('StoreContactUs') }}" method="POST" id="form__contact__us" class="contact__us__form">
				<div class="form-group">
					<span class="form">Full Name</span>
					<input type="text" class="form-control" name="fullname">
					<span id="form--error--fullname" class="form--error--message"></span>
				</div>

				<div class="form-group">
					<span class="form">Email</span>
					<input type="text" class="form-control" name="email">
					<span id="form--error--email" class="form--error--message"></span>
				</div>
				<div class="form-group">
					<span class="form">Message</span>
					<textarea class="form-control" name="message"></textarea>
					<span id="form--error--message" class="form--error--message"></span>
				</div>
				<hr/>
				<div class="form-group">
					<input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
					<button type="submit" id="submit__form__contact__us" class="btn btn-primary">SEND</button>
				</div>
			</form>
		</article>
	</div>
</div>
<!-- 

    _______   ______     __________  _   ___________   ____________   __  _______
   / ____/ | / / __ \   / ____/ __ \/ | / /_  __/   | / ____/_  __/  / / / / ___/
  / __/ /  |/ / / / /  / /   / / / /  |/ / / / / /| |/ /     / /    / / / /\__ \ 
 / /___/ /|  / /_/ /  / /___/ /_/ / /|  / / / / ___ / /___  / /    / /_/ /___/ / 
/_____/_/ |_/_____/   \____/\____/_/ |_/ /_/ /_/  |_\____/ /_/     \____//____/  
                                                                                

 -->

<script type="text/javascript">
	$(document).ready(function() {
		toastr.options.closeMethod = 'fadeOut';
	    toastr.options.closeButton = true;
	    toastr.options.closeEasing = 'swing';
	    toastr.options.closeHtml = '<button><i class="icon-off"></i></button>';
	});
</script>
<script type="text/javascript" src="{{ asset('js/pages/contact_us.js') }}"></script>
