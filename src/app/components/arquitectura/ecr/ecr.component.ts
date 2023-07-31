import { AfterViewInit, Component, ViewChild, Input, OnInit, Inject } from '@angular/core';
import { EcrTags } from 'src/app/models/arquitectura/ecr-tags.model';
import { EcrInput } from 'src/app/models/arquitectura/ecr-input.model';
import { EcrReport,FindingSeverityCounts,EnhancedFindings,ReporteEcr,PackageVulnerabilityDetails,VulnerablePackages,Recommendation,ImageScanFindings, ImageScanStatus } from 'src/app/models/arquitectura/ecr-report.model';
import { EcrService } from 'src/app/services/arquitectura/ecr.service';
import { DetalleCatalogoService } from 'src/app/services/catalogo/detalle-catalogo.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Documentacion } from 'src/app/models/documentacion/documentacion.model';
import { DocumentacionService } from 'src/app/services/documentacion/documentacion.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ERespuesta } from 'src/app/models/generico/erespuesta.model';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-ecr',
  templateUrl: './ecr.component.html',
  styleUrls: ['./ecr.component.css']
})
export class EcrComponent implements  OnInit {
  displayedColumns: string[] = ['registryId',
  'repositoryName',
  'imageDigest',  
  'imageTags',
  'imageSizeInBytes',
  'imagePushedAt',
  'imageScanStatus',
  'imageScanFindingsSummary',
  'imageManifestMediaType',
  'artifactMediaType',
  'lastRecordedPullTime'];
  dataSource = new MatTableDataSource<EcrTags>();
  
  respuestaTag: ERespuesta = new ERespuesta
  respuestaReport: ERespuesta = new ERespuesta
  currentECR = {
                registryId:'',
                repositoryName:'',
                imageDigest:'',  
                imageTags:'',
                imageSizeInBytes:'',
                imagePushedAt:'',
                imageScanStatus:'',
                imageScanFindingsSummary:'',
                imageManifestMediaType:'',
                artifactMediaType:'',
                lastRecordedPullTime:''
              };
  submitted = true;
  tableActive = true;
  repositoryName = '';
  imageDigest = '';
  imageTag = '';
  imageStatus =''
  tabActive=true;
  totalVulnera = 0;
  respuestaEcrTags : any;
  filter : EcrInput = new EcrInput();
  dataFind : FindingSeverityCounts = new FindingSeverityCounts();
  dataReport : EcrReport = new EcrReport();
  scanFind : ImageScanFindings = new ImageScanFindings();
  dataReporVulner : ReporteEcr[] = [];
  reporteEcr : ReporteEcr = new ReporteEcr();
  imaStatus : ImageScanStatus = new ImageScanStatus();
  dataVulnera: EnhancedFindings[] = [];
  dataVulneraPack: VulnerablePackages[] = [];
  dataRecomm: Recommendation = new Recommendation();
  dataPacVUlneDeta: PackageVulnerabilityDetails = new PackageVulnerabilityDetails(); 
  dataUrl: string[] = [];
  dataSourceTMP: [] = [];
  displayedColumnsVulnera: string[] = ['nombre',
  'paquete',
  'gravedad',
  'descripcion',
  'estado',
  'referencia',
  'correcion'
];
//dataSourceVulnera = new MatTableDataSource<EnhancedFindings>();
dataSourceReportVulnera = new MatTableDataSource<ReporteEcr>();
color: ThemePalette = 'primary';
mode: ProgressBarMode = 'determinate';
value = 100;
bufferValue = 75;

  constructor(private servidorService: EcrService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private documentacionService: DocumentacionService,
    private detalleCatalogoService: DetalleCatalogoService) { }

  ngOnInit(): void {  
  }

  ngOnChanges(): void{
  }
  enablePanel(): void {
    this.topPage();
    this.submitted = false;
    this.tableActive = false;    
    if(this.currentECR.registryId==null || this.currentECR.registryId==''){
      this.tabActive=false;
    }
    else
    {
      this.tabActive=true;
    }
  }
  disablePanel(): void{
    this.topPage();
    this.submitted = true;
    this.tableActive = true;
    this.cleanPanel();
  }

  cleanPanel(): void{
    this.currentECR = {
      registryId:'',
      repositoryName:'',
      imageDigest:'',  
      imageTags:'',
      imageSizeInBytes:'',
      imagePushedAt:'',
      imageScanStatus:'',
      imageScanFindingsSummary:'',
      imageManifestMediaType:'',
      artifactMediaType:'',
      lastRecordedPullTime:''      
    };
  }
  topPage(): void{
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
 /* editECR(item: ECR): void{
      this.enablePanel();
      setTimeout(() => {
        this.currentECR = {
          id: item.id||'',
          areaMat: item.areaMat||'',
          etapaMat: item.etapaMat||'',
          metodologiaMat: item.metodologiaMat||'',
          idDoc: item.idDoc||'',
          publicacionMat: item.publicacionMat||'',
          firmaMat: item.firmaMat||'',
          firmanteMat: item.firmanteMat||'',
          versionesMat: item.versionesMat||'',
          obligatorioMat: item.obligatorioMat||'',
          observacionMat: item.observacionMat||'',
          notaMat: item.notaMat||''
        };
      }, 100);
      if(this.currentECR.id==null || this.currentECR.id==''){
        this.tabActive=true;
      }
      else
      {
        this.tabActive=false;
      }
      console.log('this.tabActive'+this.tabActive);

  }*/  
  getECR(): void {
    this.mode = 'indeterminate';
    this.color = 'accent';
    this.filter.repositoryName = this.repositoryName;
    this.filter.imageDigest = '';
    this.dataSource= new MatTableDataSource<EcrTags>();
    this.servidorService.getList(this.filter)
      .subscribe({
        next: (data) => {
          this.respuestaTag = data;
          this.dataSource = new MatTableDataSource<EcrTags>(this.respuestaTag.body);
          this.mode = 'determinate';
          this.color = 'primary';
        },
        error: (er) => {
          this.createSnackBar(er.error.error.mensaje);
          this.mode = 'determinate';
          this.color = 'primary';
        }
      });
    }
      
  getECRFilter(repo:string, image:string): void {
    this.mode = 'indeterminate';
    this.color = 'accent';
    this.filter.repositoryName = repo||'';
    this.filter.imageDigest = image||'';
    this.servidorService.getReport(this.filter)
      .subscribe({
        next: (data) => {
          this.respuestaReport = data;
          this.dataReport = <EcrReport>this.respuestaReport.body;
          this.imaStatus = <ImageScanStatus> this.dataReport.imageScanStatus;
          this.imageStatus = this.imaStatus.status+': ' + this.imaStatus.description;
          this.scanFind = <ImageScanFindings> this.dataReport.imageScanFindings;
          this.dataFind = <FindingSeverityCounts> this.scanFind.findingSeverityCounts;
          console.log(this.dataFind);
          if(this.dataFind==null)
          {
            this.dataFind = new FindingSeverityCounts();
            this.dataFind.UNDEFINED = '0';
            this.dataFind.UNTRIAGED = '0';
            this.dataFind.MEDIUM = '0';
            this.dataFind.LOW = '0';
            this.dataFind.HIGH = '0';
            this.dataFind.CRITICAL = '0';
          }
          else
          {              
            if((this.dataFind.UNDEFINED+'')==null || (this.dataFind.UNDEFINED+'')=='' || typeof this.dataFind.UNDEFINED === 'undefined'  || (this.dataFind.UNDEFINED+'')=='undefined'){
              this.dataFind.UNDEFINED = '0';
            }
            if((this.dataFind.UNTRIAGED+'')==null || (this.dataFind.UNTRIAGED+'')=='' || typeof this.dataFind.UNTRIAGED === 'undefined' || (this.dataFind.UNTRIAGED+'')=='undefined'){
              this.dataFind.UNTRIAGED = '0';
            }
            if((this.dataFind.MEDIUM+'')==null || (this.dataFind.MEDIUM+'')=='' || typeof this.dataFind.MEDIUM === 'undefined' || (this.dataFind.MEDIUM+'')=='undefined'){
              this.dataFind.MEDIUM = '0';
            }
            if((this.dataFind.LOW+'')==null || (this.dataFind.LOW+'')=='' || typeof this.dataFind.LOW === 'undefined' || (this.dataFind.LOW+'')=='undefined'){
              this.dataFind.LOW = '0';
            }
            if((this.dataFind.HIGH+'')==null || (this.dataFind.HIGH+'')=='' || typeof this.dataFind.HIGH === 'undefined' || (this.dataFind.HIGH+'')=='undefined'){
              this.dataFind.HIGH = '0';
            }
            if((this.dataFind.CRITICAL+'')==null || (this.dataFind.CRITICAL+'')=='' || typeof this.dataFind.CRITICAL === 'undefined' || (this.dataFind.CRITICAL+'')=='undefined'){
              this.dataFind.CRITICAL = '0';
            }
          }

          this.totalVulnera = parseInt(this.dataFind.CRITICAL+'') + parseInt(this.dataFind.HIGH+'') + parseInt(this.dataFind.LOW+'')
           + parseInt(this.dataFind.MEDIUM+'') + parseInt(this.dataFind.UNTRIAGED+'')+ parseInt(this.dataFind.UNDEFINED+'');
          this.dataVulnera = <EnhancedFindings[]> this.scanFind.enhancedFindings
          var i = 0;
          var urlVul = '';
          var packVuln = '';
          for (const item of this.dataVulnera) {
           this.dataPacVUlneDeta = <PackageVulnerabilityDetails>item.packageVulnerabilityDetails;
           this.dataUrl = <string[]>this.dataPacVUlneDeta.referenceUrls;
           this.dataVulneraPack = <VulnerablePackages[]>this.dataPacVUlneDeta.vulnerablePackages;
           this.dataRecomm = <Recommendation>item.remediation?.recommendation;
            for (const pack of this.dataVulneraPack) {
              packVuln = packVuln + pack.name + ' - ';
            }
            this.reporteEcr.descripcion = item.description;
            this.reporteEcr.referencia = this.dataPacVUlneDeta.sourceUrl;
            this.reporteEcr.nombre = this.dataPacVUlneDeta.vulnerabilityId;
            this.reporteEcr.paquete = packVuln;
            this.reporteEcr.estado = item.status;
            this.reporteEcr.gravedad = item.severity;
            this.reporteEcr.correcion = this.dataRecomm.text + ' : ' + this.dataRecomm.url;
            this.dataReporVulner.push(this.reporteEcr);
            packVuln='';
            this.reporteEcr = new ReporteEcr();
         }
         this.dataSourceReportVulnera.data=this.dataReporVulner;
         console.log(this.dataSource);
         console.log(this.dataSourceReportVulnera);
         this.mode = 'determinate';
         this.color = 'primary';

        },
        error: (er) => {
          this.createSnackBar(er.error.error.mensaje);
          this.mode = 'determinate';
          this.color = 'primary';
        }
      });
    }


    createSnackBar(mensaje: string): void {
      this._snackBar.open(mensaje,'OK',{
        duration: 2000
      });
    }

    
  selectAnalisis(item: EcrTags): void{
    this.dataSourceReportVulnera = new MatTableDataSource<ReporteEcr>();
    this.dataFind = new FindingSeverityCounts();
    this.scanFind = new ImageScanFindings();
    this.dataReport = new EcrReport();
    this.imaStatus = new ImageScanStatus();
    this.imageStatus = "";



    this.imageTag = item.imageTags;
    this.imageStatus = item.imageScanStatus+'';
    this.getECRFilter( item.repositoryName+'' , item .imageDigest+''); 

    this.enablePanel();
    setTimeout(() => {
      this.currentECR = {
        registryId:'',
        repositoryName:'',
        imageDigest:'',  
        imageTags:'',
        imageSizeInBytes:'',
        imagePushedAt:'',
        imageScanStatus:'',
        imageScanFindingsSummary:'',
        imageManifestMediaType:'',
        artifactMediaType:'',
        lastRecordedPullTime:''      
      };
    }, 50);
    if(this.currentECR.registryId==null || this.currentECR.registryId==''){
      this.tabActive=true;
    }
    else
    {
      this.tabActive=false;
    }    

      }
      print(): void {
        let printContents!: string;
        let popupWin!: any;
        printContents = document.getElementById('print')!.innerHTML.toString();;
        printContents = ((printContents as string) + '').replace('col-sm', 'col-xs');
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`<html lang="fa"><body onload="window.print();">${printContents}</body></html>`);
        popupWin.document.close();}

  }
  
  @Component({
    selector: 'ecr-report.component-dialog',
    templateUrl: 'ecr-report.component-dialog.html',
    styleUrls: ['ecr-report.component-dialog.css']
  })
  export class EcrComponentDialog implements OnInit {
    constructor(
      public dialogRef: MatDialogRef<EcrComponentDialog>,
      @Inject(MAT_DIALOG_DATA) public data: ImageScanFindings) {
      }
    
    ngOnInit(): void {  
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
  }