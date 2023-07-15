import style from '@/styles/semantics/Footer.module.css'
import Image from 'next/image';
import Link from 'next/link'

export default function Footer() {
  return (
	<section id={style.footer}>
		<div className="container">
			<footer>
				<div>
					<div className={style.left}>
						<div>
							<div>
								<Image
									src="/logotcc.png"
									width={0}
									height={0}
									style={{height: "75%", width: "100%", objectFit: "contain", margin: "auto"}}
									unoptimized={true}
									alt="Logo"
								/>
							</div>
							<p className={style.footerText}><Link href="/">TheChillChamber.herokuapp.com</Link> © 2023</p>
						</div>
					</div>
					<div className={style.right}>
						<Link href="https://raileyvictuelles.herokuapp.com">
							<Image
								src="/FRV-LOGO.png"
								width={0}
								height={0}
								style={{height: "75%", width: "100%", objectFit: "contain", margin:"auto"}}
								unoptimized={true}
								alt="Logo"
							/>
						</Link>
					</div>
				</div>
			</footer>
		</div>
	</section>
  )
}
