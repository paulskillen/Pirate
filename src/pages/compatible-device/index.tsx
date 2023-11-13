/* eslint-disable react/no-unescaped-entities */
import PageHeader from "@/container/shared/header/PageHeader";
import { LayoutClean } from "@/container/shared/layout/Layout";
import Messages from "@/languages/Messages";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const html = `<p><strong>iOS devices that support eSIM</strong></p>
<ul>
    <li>iPhone 14 / Pro / Pro Max</li>
    <li>iPhone 13 / Pro / Pro Max / Mini</li>
    <li>iPhone 12 / Pro / Pro Max / Mini</li>
    <li>iPhone 11 / Pro / Pro Max</li>
    <li>iPhone XS / XS Max</li>
    <li>iPhone XR</li>
    <li>iPhone SE (2020 / 2022)</li>
    <li>iPad Air (3rd &amp; 4th Generation)</li>
    <li>iPad Pro 11inch (1st / 2nd/ 3rd generation)</li>
    <li>iPad Pro 12.9inch (3rd / 4th / 5th generation)</li>
    <li>iPad (7th / 8th / 9th generation)</li>
    <li>iPad Mini (5th / 6th generation)</li>
</ul>
<p><strong>*IMPORTANT: Some Apple devices DO NOT have eSIM capability:</strong> <em>iPhone from mainland China. iPhone devices from Hong Kong and Macao (except for iPhone 13 mini, iPhone 12 mini, iPhone SE 2020, and iPhone XS). Only iPad devices with Wi-Fi + Cellular features are supported.</em></p>
<p><strong>Android devices with eSIM support</strong></p>
<p><strong>Samsung*</strong></p>
<ul>
    <li>Samsung Galaxy S23</li>
    <li>Samsung Galaxy S23+</li>
    <li>Samsung Galaxy S23 Ultra</li>
    <li>Samsung Galaxy S22 Ultra 5G</li>
    <li>Samsung Galaxy S22+ 5G</li>
    <li>Samsung Galaxy S22 5G</li>
    <li>Samsung Galaxy S21 Ultra 5G</li>
    <li>Samsung Galaxy S21 5G</li>
    <li>Samsung Galaxy S21+ 5G</li>
    <li>Samsung Galaxy S20</li>
    <li>Samsung Galaxy S20+</li>
    <li>Samsung Galaxy Z Flip</li>
    <li>Samsung Galaxy Z Flip3 5G</li>
    <li>Samsung Galaxy Z Fold3</li>
    <li>Samsung Galaxy Z Fold2</li>
    <li>Samsung Galaxy Fold</li>
    <li>Samsung Galaxy Note 20 Ultra</li>
    <li>Samsung Galaxy Note 20+</li>
    <li>Samsung Galaxy Note 20</li>
</ul>
<p><strong><em>*Samsung devices that DO NOT have eSIM capability:</em></strong> <em>&ndash; All Samsung S20 FE/S21 FE models &ndash; US versions of Samsung S20/S21 and Galaxy Z Flip 5G &ndash; USA and Hong Kong versions of Samsung Note 20 Ultra and Samsung Galaxy Z Fold 2 &ndash; Most Samsung devices purchased in South Korea do not support eSIMs.</em></p>
<p><strong>Google Pixel</strong></p>
<ul>
    <li>Google Pixel 7 / 7 Pro</li>
    <li>Google Pixel 5 / 6 / 6a / 6 Pro</li>
    <li>Google Pixel 4, 4a &amp; 4 XL</li>
    <li>Google Pixel 3 &amp; 3 XL*</li>
    <li>Google Pixel 3a &amp; 3a XL*</li>
</ul>
<p><strong>*Google Pixel devices&nbsp;that DO NOT&nbsp;have eSIM capability:</strong> <em>&ndash; Pixel 3: Australia, Taiwan, and Japan; and those bought with service from any of the US or Canadian carriers other than Sprint and Google Fi. &ndash; Pixel 3a bought in South East Asia and with Verizon service.</em></p>
<p><strong>HAMMER</strong></p>
<ul>
    <li>HAMMER Explorer PRO</li>
    <li>HAMMER Blade 3</li>
    <li>HAMMER Blade 5G</li>
    <li>myPhone NOW eSIM</li>
</ul>
<p><strong>Motorola</strong></p>
<ul>
    <li>Motorola Razr 2019</li>
    <li>Motorola Razr 5G</li>
</ul>
<p><strong>Huawei</strong></p>
<ul>
    <li>Huawei P40&nbsp;</li>
    <li>Huawei P40 Pro*</li>
    <li>Huawei Mate 40 Pro</li>
</ul>
<p><strong>*Huawei P40 Pro+ is not compatible with eSIMs.</strong></p>
<p><strong>OnePlus</strong></p>
<ul>
    <li>OnePlus 11 5G*</li>
</ul>
<p>*<strong>eSIM support is only available in certain regions. Please contact your carrier or device manufacturer to confirm that your OnePlus device is eSIM-capable.</strong></p>
<p><strong>OPPO</strong></p>
<ul>
    <li>OPPO Find X3 Pro*</li>
    <li>OPPO Find X5*</li>
    <li>OPPO Find X5 Pro*</li>
    <li>OPPO Reno A*</li>
</ul>
<p><strong>SONY</strong></p>
<ul>
    <li>Sony Xperia 10 III Lite</li>
    <li>Sony Xperia 10 IV</li>
    <li>Sony Xperia 1 IV</li>
</ul>
<p><strong>Others brands</strong></p>
<ul>
    <li>Nuu Mobile X5</li>
    <li>Gemini PDA 4G+Wi-Fi</li>
    <li>Xiaomi 12T Pro (Global Version)</li>
    <li>Fairphone 4</li>
</ul>
<p>&nbsp;</p>
<p><strong>Windows devices with eSIM support</strong></p>
<p>Windows 10* / Windows 11</p>
<p><strong>ACER</strong></p>
<ul>
    <li>ACER Swift 3</li>
    <li>ACER Swift 7</li>
</ul>
<p><strong>SURFACE*</strong></p>
<ul>
    <li>Surface Go 3</li>
    <li>Surface Pro X</li>
    <li>Surface Duo 2</li>
    <li>Surface Duo</li>
</ul>
<p><strong>Dell</strong></p>
<ul>
    <li>Dell Latitude 9510</li>
    <li>Dell Latitude 7410</li>
    <li>Dell Latitude 7310</li>
    <li>Dell Latitude 9410</li>
    <li>Dell Latitude 7210 2-in-1</li>
</ul>
<p><strong>ASUS</strong></p>
<ul>
    <li>ASUS Mini Transformer T103HAF</li>
    <li>ASUS NovaGo TP370QL</li>
    <li>ASUS Vivobook Flip 14 TP401NA</li>
</ul>
<p><strong>HP</strong></p>
<ul>
    <li>HP Elitebook G5</li>
    <li>HP Probook G5</li>
    <li>HP Zbook G5</li>
    <li>HP Spectre Folio 13</li>
</ul>
<p><strong>LENOVO</strong></p>
<ul>
    <li>Lenovo Yoga C630</li>
    <li>Lenovo Yoga 520</li>
    <li>Lenovo Yoga 720 convertible laptops</li>
    <li>Lenovo Miix 630</li>
</ul>`;

const CompatibleDevice: NextPage = () => {
    const router = useRouter();
    return (
        <div className="">
            <PageHeader title={Messages.compatibleDevices} />
            <div className="container relative bg-black z-10 text-white px-4 pt-3 pb-36" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
};

export default CompatibleDevice;

//@ts-ignore
CompatibleDevice.Layout = LayoutClean;
