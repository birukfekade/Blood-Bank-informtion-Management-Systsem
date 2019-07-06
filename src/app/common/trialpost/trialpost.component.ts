import { Component, OnInit } from '@angular/core';
import {Donationcenter} from '../../bbims/post';
import {PostService} from '../../bbims/post.service';

@Component({
  selector: 'app-trialpost',
  templateUrl: './trialpost.component.html',
  styleUrls: ['./trialpost.component.css'],
  providers: [PostService]
})
export class TrialpostComponent implements OnInit {
  donationcenter: Donationcenter = new Donationcenter();
  errorMessage= '';
  constructor(private postService: PostService) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.donationcenter);
    // this.postService.createDonationcenter(this.donationcenter).subscribe(res => {
    //   console.log(res.id);
    //   // this.router.navigate(['/donationcenter', res.id]);
    //
    // }, err => {
    //   console.log(err);
    //
    //   this.errorMessage = 'An Error Saving the Post';
    // });
  }
}
