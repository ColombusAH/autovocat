import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'autovocat-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  isMenuOpen = false;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {}
}
