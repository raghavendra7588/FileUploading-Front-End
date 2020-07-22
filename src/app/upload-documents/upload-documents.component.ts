import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UploadDocumentsService } from './upload-documents.service';
import { NgForm } from '@angular/forms';
import { EmitterService } from 'src/shared/emitter.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})



export class UploadDocumentsComponent implements OnInit, OnDestroy {

  selectedDocument: string;
  isDocumentTypeSelected: boolean = false;
  isFileUploaded: boolean = false;
  filename: string = null;
  fileData: File = null;
  fileName: any;
  @ViewChild('uploadForm') public uploadForm: NgForm;
  displayedColumns: string[] = ['fileType', 'filePath', 'createdOn'];
  createdBy: string;
  dataSource: any;
  newRecordSubscription: Subscription;
  userId: string;
  role: string;
  user: any;
  documents: any;

  constructor(public UploadDocumentsService: UploadDocumentsService,
    public emitterService: EmitterService,
    public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.role = params['role'];
    });
  }




  ngOnInit(): void {

    if (this.role === 'salesTeam' || this.role === 'nonSalesTeam' || this.role === 'bussinessPartners') {

      this.documents = [
        { id: 0, type: 'Pan Card' },
        { id: 1, type: 'Aadhar Card' },
        { id: 3, type: 'Cancel Cheque' },
        { id: 4, type: 'Individual Photo Copy' }
      ];
    }
    else {
      this.documents = [
        { id: 0, type: 'Pan Card' },
        { id: 1, type: 'Aadhar Card' },
        { id: 2, type: 'Shop Act' },
        { id: 3, type: 'Cancel Cheque' },
        { id: 4, type: 'Individual Photo Copy' },
        { id: 5, type: 'Shop Photo' },
        { id: 6, type: 'Vendor Photo with Shop' }
      ];
    }

    this.fetchAllRecords();
    this.newRecordSubscription = this.emitterService.isRecord.subscribe(value => {
      if (value) {
        this.fetchAllRecords();
      }
    });
  }


  onFileSelect(e: any): void {

    this.fileData = <File>e.target.files[0];
    this.isFileUploaded = true;
    this.fileName = e.target.files[0].name;
  }


  onDocumentSubmit() {
    const formData = new FormData();
    this.createdBy = '';
    formData.append('File', this.fileData, this.fileName);
    formData.append('documentType', this.selectedDocument);
    formData.append('createdBy', this.createdBy);
    formData.append('userId', this.userId);

    this.UploadDocumentsService.uploadDocuments(formData).subscribe(data => {
      this.emitterService.isRecord.emit(true);
      this.uploadForm.reset();
    });

  }

  fetchAllRecords() {
    this.UploadDocumentsService.getAllDocuments().subscribe(data => {
      this.dataSource = data;
    });
  }


  selectedDocumentType() {
    this.isDocumentTypeSelected = true;
  }


  ngOnDestroy() {
    this.isDocumentTypeSelected = false;
    this.newRecordSubscription.unsubscribe();
  }

}