import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'autovocat-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {}
}
