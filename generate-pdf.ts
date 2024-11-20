import path from 'path'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(new URL(import.meta.url).pathname) // Get the directory of the current file

const generatePDF = async (): Promise<void> => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	// Correct way to get the report path in ES modules
	const allureReportPath = path.join(__dirname, 'allure-report', 'index.html')

	try {
		await page.goto(`file://${allureReportPath}`, { waitUntil: 'networkidle2' })
		await page.pdf({ path: 'allure-report.pdf', format: 'A4' })

		console.log('PDF report generated successfully: allure-report.pdf')
	} catch (error) {
		console.error('Error generating PDF:', error)
	} finally {
		await browser.close()
	}
}

generatePDF().catch((err) => console.error(err))
