import Image from 'next/image';
import logo from '../../../public/assets/images/viacation.svg'

function Footer() {
    return <section className="bg-slate-50">
        <div className="container mx-auto">
            <div className="grid-rows-1">
                <div className="columns-5">
                    <div className="columns-1">
                        <Image height={124} alt="Viacation" src={logo} />
                    </div>
                    <div className="columns-1">Footer</div>
                    <div className="columns-1">Footer</div>
                    <div className="columns-1">Footer</div>
                    <div className="columns-1">Footer</div>
                </div>
            </div>
        </div>
    </section>;
}

export default Footer;