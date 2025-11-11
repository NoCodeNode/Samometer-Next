import jsPDF from 'jspdf';

class ExportManager {
    constructor(data) {
        this.data = data;
    }

    exportToPDF(filename) {
        const doc = new jsPDF();
        // PDF generation logic
        doc.text('Exported Data:', 10, 10);
        this.data.forEach((item, index) => {
            doc.text(JSON.stringify(item), 10, 10 + (index + 1) * 10);
        });
        doc.save(filename + '.pdf');
    }

    exportToJSON(filename) {
        const json = JSON.stringify(this.data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename + '.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    exportToCSV(filename) {
        const csvContent = this.data.map(e => Object.values(e).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename + '.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Example usage
const data = [{ name: 'Item 1', value: 'Value 1' }, { name: 'Item 2', value: 'Value 2' }];
const manager = new ExportManager(data);
// manager.exportToPDF('export');
// manager.exportToJSON('export');
// manager.exportToCSV('export');
