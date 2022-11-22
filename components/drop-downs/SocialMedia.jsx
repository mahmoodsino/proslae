/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { BrandFacebook, BrandTwitter, BrandInstagram, BrandYoutube, BrandLinkedin } from 'tabler-icons-react';

export default function SocialMedia() {

	return (
		<div className="ltn__social-media">
			<ul>
					<li>
						<a href="" title="Facebook" target="_blank">
							<BrandFacebook size="21" />
						</a>
					</li>
					<li>
						<a href="" title="Twitter" target="_blank">
							<BrandTwitter size="21" />
						</a>
					</li>
					<li>
						<a href="" title="Instagram" target="_blank">
							<BrandInstagram size="21" />
						</a>
					</li>
					<li>
						<a href="" title="Youtube" target="_blank">
							<BrandYoutube size="21" />
						</a>
					</li>
					<li>
						<a href="" title="Linkedin" target="_blank">
							<BrandLinkedin size="21" />
						</a>
					</li>
			</ul>
		</div>
	);
}
