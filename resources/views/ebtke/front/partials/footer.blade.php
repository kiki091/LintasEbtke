<footer id="desktop-footer" class="visible-md">
	<div class="top-footer">
		<div class="container">
			<div class="row">
				<div class="col-md-5">
					
				</div>
				{{--
				<div class="col-md-3">
                    <div class="content__footer__middle">
                        <h3 class="footer__title">SUBSIDIARY OF</h3>
                        <div class="left__logo">
    					   <img class="pull-left" src="{{ asset('bin/db/images/content_bottom/pic_3BE8935B147684B314A35F8A01705CA4.jpg') }}">
                        </div>
                        <div class="right__logo">
                            <img class="pull-right" src="{{ asset('bin/db/images/content_bottom/pic_3BE8935B147684B314A35F8A01705CA4.jpg') }}">
                        </div>
                        <div class="center__logo">
                            <img src="{{ asset('bin/db/images/content_bottom/pic_565FE15B71176D013D34E37EDF06CE23.jpg') }}">
                        </div>
                    </div>
				</div>
                --}}
				<div class="content_footer_mailing col-md-4 pull-right">
					<div id="footer-content-js">
						<div class="desktop-footer-block footer-block-03">
							<div id="desktop-footer-mailing-list">
								<h4>
                                    {{ trans('global_page.footer_title_mail') }}
                                </h4>
								<p>
                                    {{ trans('global_page.footer_desc_mail') }}
                                </p>
                                <form action="" id="desktop-footer-mailing-list-form" method="post">
                                	<div class="form-group">
                                		<input name="email" type="text" class="required only-email" placeholder="{{ trans('global_page.footer_placeholder_mail') }}">
                                		<div class="form--error--message"></div>
                                	</div>
                                	<input type="submit" value=">">
                                </form>
                            </div>
                            <div id="desktop-footer-social-links">
                            	<h4>
                                    {{ trans('global_page.footer_title_social_media') }}
                                </h4>
                            	<ul>
                                    <li>
                                        <a href="https://www.instagram.com/" target="_blank">
                                            <span class="icon icon-instagram"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/" target="_blank">
                                            <span class="icon icon-facebook"></span>
                                        </a>
                                    </li>
                                      
                                    <li>
                                        <a href="http://www.twitter.com/pusripalembang" target="_blank">
                                            <span class="icon icon-twitter"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://www.youtube.com/channel/UC_wRlJ5Vb2QZ8nXercC4dUQ" target="_blank">
                                            <span class="icon icon-youtube"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
    <div class="bottom-footer">
        <div class="container-fluid has-breakpoint">
            <div class="row">
                <div class="col-md-6 pull-left">
                    <p class="desktop-footer-copywrite">
                        {{ trans('global_page.footer_title_copyright') }}
                    </p>
                </div>
                <div id="desktop__content" class="pull-right col-md-3>

                    <div class="desktop-footer-trip-advisor-container">
                        <a class="desktop-footer-trip-advisor" style="cursor: default;">
                            <img src="{{ asset(DEFAULT_IMAGE_FOOTER_SVG) }}" width="151" height="32">
                        </a>
                    </div>

                </div>
            </div>
        </div>
  </div>
</footer>